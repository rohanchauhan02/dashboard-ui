import { useState, useCallback, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
} from "reactflow";
import WorkflowToolbar from "@/components/WorkflowToolbar";
import WorkflowCanvas from "@/components/WorkflowCanvas";
import NodePanel from "@/components/NodePanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, BookOpen, GitFork } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const WorkflowEditor = () => {
  const params = useParams<{ id: string }>();
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const isNew = !params.id || params.id === "new";

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [workflowName, setWorkflowName] = useState(
    isNew ? location.state?.name || "New Workflow" : "" // Initialize name from location.state for new workflows
  );
  const [status, setStatus] = useState<"active" | "draft" | "error">("draft");
  const [activeTab, setActiveTab] = useState("canvas");

  // Fetch workflow if editing existing one
  const {
    data: workflow,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: [`workflow-${params.id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/v1/workflows/${params.id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch workflow");
      }
      const data = await res.json();
      console.log("Workflow Data:", data); // Debugging
      return data.data;
    },
    enabled: !isNew,
    onError: (error) => {
      toast({
        title: "Error fetching workflow",
        description: error.message,
        status: "error",
      });
    },
  });

  // Initialize workflow from data
  useEffect(() => {
    if (workflow && !isLoading) {
      setWorkflowName(workflow.name); // Set workflow name from fetched data
      setStatus(workflow.status || "draft"); // Default to "draft" if status is missing
      setNodes(workflow.nodes || []);
      setEdges(workflow.edges || []);
    }
  }, [workflow, isLoading, setNodes, setEdges]);

  // Handle node connections
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Save workflow mutation
  const saveWorkflowMutation = useMutation({
    mutationFn: async (workflowData: {
      name: string;
      status: string;
      nodes: Node[];
      edges: Edge[];
    }) => {
      const url = isNew
        ? `${BASE_URL}/v1/workflows`
        : `${BASE_URL}/v1/workflows/${params.id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workflowData),
      });
      if (!res.ok) {
        throw new Error("Failed to save workflow");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Workflow saved successfully!",
        status: "success",
      });
      if (isNew) {
        navigate(`/workflows/${data.data.id}/editor`, {
          state: { name: workflowName }, // Pass the updated name in location.state
        });
      }
      queryClient.invalidateQueries(["/v1/workflows"]);
    },
    onError: (error) => {
      toast({
        title: "Error saving workflow",
        description: error.message,
        status: "error",
      });
    },
  });

  // Handle saving workflow
  const handleSaveWorkflow = () => {
    console.log("Saving workflow...", { workflowName, status, nodes, edges }); // Debugging
    saveWorkflowMutation.mutate({
      name: workflowName,
      status,
      nodes,
      edges,
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500">Error loading workflow. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Scrollable Sidebar with Recent Workflows */}
      <div className="w-64 fixed h-full overflow-y-auto">
        <Sidebar maxRecentWorkflows={5} showMoreButton={true} />
      </div>
      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        <WorkflowToolbar
          workflowId={isNew ? undefined : params.id}
          workflowName={workflowName}
          status={status}
          onNameChange={setWorkflowName}
          onSave={handleSaveWorkflow}
        />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="border-b px-4">
            <TabsList className="h-12">
              <TabsTrigger
                value="canvas"
                className="flex items-center gap-2 px-4"
              >
                <Activity size={16} />
                <span>Canvas</span>
              </TabsTrigger>
              <TabsTrigger
                value="rules"
                className="flex items-center gap-2 px-4"
              >
                <GitFork size={16} />
                <span>Rule Engine</span>
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="flex items-center gap-2 px-4"
              >
                <BookOpen size={16} />
                <span>Recommendations</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="canvas"
            className="flex-1 flex overflow-hidden p-0 border-none"
          >
            <ReactFlowProvider>
              <WorkflowCanvas
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
              />
              <NodePanel
                selectedNode={selectedNode}
                onNodeSelect={setSelectedNode}
              />
            </ReactFlowProvider>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkflowEditor;

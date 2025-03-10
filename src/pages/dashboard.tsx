import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { formatDate } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Plus, Search, GitBranch, Clock, Play, Trash, FileEdit } from "lucide-react";

const fetchWorkflows = async () => await apiRequest("GET", "/api/workflows");
const fetchRecentExecutions = async () => await apiRequest("GET", "/api/workflow-executions/recent");

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: "bg-green-500",
    draft: "bg-yellow-500",
    error: "bg-red-500",
  };
  return colors[status] || "bg-gray-500";
};

const getExecutionStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    completed: "bg-green-500",
    running: "bg-blue-500",
    failed: "bg-red-500",
  };
  return colors[status] || "bg-gray-500";
};

const Dashboard = () => {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [workflowToDelete, setWorkflowToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: workflows = [], isLoading: isLoadingWorkflows } = useQuery({
    queryKey: ["/api/workflows"],
    queryFn: fetchWorkflows,
  });

  const { data: recentExecutions = [], isLoading: isLoadingExecutions } = useQuery({
    queryKey: ["/api/workflow-executions/recent"],
    queryFn: fetchRecentExecutions,
  });

  const deleteWorkflowMutation = useMutation({
    mutationFn: async (id: string) => await apiRequest("DELETE", `/api/workflows/${id}`),
    onSuccess: () => {
      toast({ title: "Workflow deleted", description: "Successfully deleted" });
      queryClient.invalidateQueries({ queryKey: ["/api/workflows"] });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const runWorkflowMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("POST", `/api/workflows/${id}/run`);
      return response.json();
    },
    onSuccess: (data) => {
      toast({ title: "Workflow running", description: `Execution ID: ${data.executionId}` });
      queryClient.invalidateQueries({ queryKey: ["/api/workflow-executions/recent"] });
    },
    onError: (error) => {
      toast({ title: "Error running workflow", description: error.message, variant: "destructive" });
    },
  });

  const handleDeleteWorkflow = (id: string) => setWorkflowToDelete(id);
  const confirmDeleteWorkflow = () => workflowToDelete && deleteWorkflowMutation.mutate(workflowToDelete);

  const filteredWorkflows = useMemo(
    () => workflows.filter((workflow: any) => workflow.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [workflows, searchQuery]
  );

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => navigate("/workflows/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search workflows..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="workflows">
        <TabsList>
          <TabsTrigger value="workflows">My Workflows</TabsTrigger>
          <TabsTrigger value="history">Recent Executions</TabsTrigger>
        </TabsList>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="mt-4">
          {isLoadingWorkflows ? (
            <p>Loading workflows...</p>
          ) : filteredWorkflows.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorkflows.map((workflow: any) => (
                <Card key={workflow.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`} />
                    </div>
                    <CardDescription>Last edited: {formatDate(workflow.updatedAt || workflow.createdAt)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500">
                      <GitBranch className="h-4 w-4 mr-1" />
                      <span>{workflow.nodeCount || 0} nodes</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => runWorkflowMutation.mutate(workflow.id)}>
                      <Play className="h-4 w-4 mr-1" />
                      Run
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/workflows/${workflow.id}`)}>
                      <FileEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteWorkflow(workflow.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p>No workflows found.</p>
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Workflow Dialog */}
      <AlertDialog open={workflowToDelete !== null} onOpenChange={(open) => !open && setWorkflowToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteWorkflow} className="bg-red-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;

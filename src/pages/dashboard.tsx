import { useState, useMemo, SetStateAction } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "../hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import { formatDate } from "../lib/utils";

import NewWorkflowModal from "./new-workflow";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { Button } from "@/components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { Plus, Search, GitBranch, Play, Trash, FileEdit } from "lucide-react";

const getStatusColor = (status: string | number) => {
  const colors = {
    active: "bg-green-500",
    draft: "bg-yellow-500",
    error: "bg-red-500",
  };
  return colors[status] || "bg-gray-500";
};

const Dashboard = () => {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [workflowToDelete, setWorkflowToDelete] = useState(null);
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateWorkflow = (name: string) => {
    console.log("Creating workflow with name:", name);
    // Add your logic to create a new workflow here
  };

  const { data: workflows = [], isLoading: isLoadingWorkflows } = useQuery({
    queryKey: ["/v1/workflows"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/v1/workflows`);
      const result = await res.json();
      return result.data.workflows;
    },
  });

  const deleteWorkflow = async (id: string) => {
    const res = await fetch(`${BASE_URL}/v1/workflows/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete workflow");
    }
    return res.json();
  };

  const deleteWorkflowMutation = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      // Invalidate the "workflows" query to refetch data
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
      alert("Workflow deleted successfully!");
      setWorkflowToDelete(null); // Reset the workflow to delete
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleDeleteWorkflow = (id: string) =>
    setWorkflowToDelete(id as unknown as null);
  const confirmDeleteWorkflow = () => {
    if (workflowToDelete) {
      deleteWorkflowMutation.mutate(workflowToDelete);
    }
  };

  const filteredWorkflows = useMemo(
    () =>
      workflows.filter((workflow: { name: string }) =>
        workflow.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [workflows, searchQuery]
  );

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="bg-black text-white border-white border-2 px-4 py-2 rounded-md hover:bg-white hover:text-black transition-colors duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          Create Workflow
        </button>

        <NewWorkflowModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateWorkflow}
        />
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search workflows..."
          className="pl-10"
          value={searchQuery}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setSearchQuery(e.target.value)
          }
        />
      </div>

      <Tabs defaultValue="workflows">
        {/* <TabsList>
          <TabsTrigger value="workflows">My Workflows</TabsTrigger>
        </TabsList> */}

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="mt-4">
          {isLoadingWorkflows ? (
            <p>Loading workflows...</p>
          ) : filteredWorkflows.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorkflows.map(
                (workflow: {
                  id: SetStateAction<null>;
                  name: any;
                  status: any;
                  updated_at: any;
                  created_at: any;
                }) => (
                  <Card key={workflow.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {workflow.name}
                        </CardTitle>
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`}
                        />
                      </div>
                      <CardDescription>
                        Last edited:{" "}
                        {formatDate(workflow.updated_at || workflow.created_at)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/workflows/${workflow.id}`)}
                      >
                        <FileEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDeleteWorkflow(workflow.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          ) : (
            <p>No workflows found.</p>
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Workflow Dialog */}
      <AlertDialog
        open={workflowToDelete !== null}
        onOpenChange={(open: unknown) => !open && setWorkflowToDelete(null)}
      >
        <AlertDialogContent className="bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteWorkflow}
              className="bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Dashboard;

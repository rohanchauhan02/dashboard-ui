import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface NewWorkflowModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: string, name: string) => void;
}

const NewWorkflowModal = ({ open, onClose, onSubmit }: NewWorkflowModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetFields = () => {
    setName("");
    setDescription("");
    setError(null);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      setError("Name and description are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/v1/workflows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          owner_id: "123e4567-e89b-12d3-a456-426614174000", // Replace with dynamic owner ID if needed
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create workflow");
      }

      const result = await response.json();
      const id = result.data.id;
      onSubmit(id, name);
      resetFields();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black border-black">
        <DialogHeader>
          <DialogTitle className="text-black">Create Workflow</DialogTitle>
          <DialogDescription className="text-gray-700">
            Enter a name and description for your new workflow.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Workflow Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-black font-normal"
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-black font-normal"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-black"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-black text-white"
            disabled={isLoading || !name.trim() || !description.trim()}
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewWorkflowModal;

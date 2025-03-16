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

interface NewWorkflowModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const NewWorkflowModal = ({
  open,
  onClose,
  onSubmit,
}: NewWorkflowModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (name.trim() && description.trim()) {
      // Trigger API call to create workflow
      await fetch("http://localhost:11001/api/v1/workflows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          owner_id: "123e4567-e89b-12d3-a456-426614174000",
        }),
      });
      onSubmit();
      onClose();
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black border-black">
        <DialogHeader>
          <DialogTitle className="text-black">Create Workflow</DialogTitle>
          <DialogDescription className="text-gray-700">
            Enter a name for your new workflow.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Workflow Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-black"
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-black"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-black">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-black text-white">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewWorkflowModal;

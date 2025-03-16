import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Plus,
  LayoutDashboard,
  GitBranch,
  History,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import NewWorkflowModal from "@/pages/new-workflow";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Sidebar = () => {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateWorkflow = (name: string) => {
    console.log("Creating workflow with name:", name);
    // Add your logic to create a new workflow here
  };

  const { data } = useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/v1/workflows`);
      const result = await res.json();
      return result.data.workflows;
    },
  });

  const workflows = data || [];
  const filteredWorkflows = workflows.filter((workflow: { name: string }) =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <Link href="/workflows/new">
          <Button className="w-full" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Workflow
          </Button>

          <NewWorkflowModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateWorkflow}
          />
        </Link>
      </div>

      <div className="px-3 mb-2">
        <div className="bg-gray-100 rounded-md px-3 py-2 flex items-center">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search workflows..."
            className="bg-transparent border-none px-2 py-1 w-full focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <div className="px-3 py-2">
          <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider px-3 mb-2">
            Main
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/">
                <a
                  className={cn(
                    "flex items-center text-sm px-3 py-2 rounded-md",
                    location === "/"
                      ? "bg-blue-50 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  <span>Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/workflows">
                <a
                  className={cn(
                    "flex items-center text-sm px-3 py-2 rounded-md",
                    location === "/workflows"
                      ? "bg-blue-50 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <GitBranch className="mr-3 h-5 w-5" />
                  <span>My Workflows</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/history">
                <a
                  className={cn(
                    "flex items-center text-sm px-3 py-2 rounded-md",
                    location === "/history"
                      ? "bg-blue-50 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <History className="mr-3 h-5 w-5" />
                  <span>Execution History</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <a
                  className={cn(
                    "flex items-center text-sm px-3 py-2 rounded-md",
                    location === "/settings"
                      ? "bg-blue-50 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Settings</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="px-3 py-2">
          <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider px-3 mb-2">
            Recent Workflows
          </h3>
          <ul className="space-y-1">
            {filteredWorkflows.length > 0 ? (
              filteredWorkflows.map(
                (workflow: {
                  id: Key | null | undefined;
                  version:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                }) => (
                  <li key={workflow.id}>
                    <Link href={`/workflows/${workflow.id}`}>
                      <a className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center cursor-pointer">
                        <span className="mr-2 text-gray-500 text-xs">
                          v{workflow.version}
                        </span>
                        <span>{workflow.name}</span>
                      </a>
                    </Link>
                  </li>
                )
              )
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500 italic">
                {searchQuery ? "No matching workflows" : "No recent workflows"}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="bg-blue-50 rounded-md p-3">
          <h3 className="font-medium text-primary mb-1">Need help?</h3>
          <p className="text-xs text-gray-600 mb-2">
            Check our documentation or contact support
          </p>
          <Button variant="link" className="p-0 h-auto text-xs text-primary">
            <HelpCircle className="h-3 w-3 mr-1" />
            View Documentation
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

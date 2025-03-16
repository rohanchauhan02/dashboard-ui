import React from "react";
import { Link } from "wouter"; // Use wouter's Link for navigation
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Workflow Orchestrator
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Automate your workflows, create rules, and leverage AI to build powerful
        automation pipelines.
      </p>

      <div className="flex flex-col space-y-4 w-full max-w-md">
        <Link href="/create-rule">
          <Button className="w-full py-3 text-lg">Create Rules</Button>
        </Link>
        <Link href="/create-workflow">
          <Button className="w-full py-3 text-lg">Create Workflow</Button>
        </Link>
        <Link href="/ai-workflow">
          <Button className="w-full py-3 text-lg bg-purple-600 hover:bg-purple-700">
            Use AI Agent to Build Workflow
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import { Switch, Route } from "wouter";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/dashboard";
import WorkflowEditor from "./pages/workflow-editor";
import Home from "./pages/home";
import ExecutionHistory from "./pages/execution-history";
import Layout from "./components/Layout";
import CreateRule from "./pages/CreateRule";
import AIWorkflowBuilder from "./pages/AIWorkflowBuilder";
import Signup from "./pages/Signup";
import SignIn from "./pages/Signin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/get-started" component={Signup} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/workflows" component={Dashboard} />
      <Route path="/workflows/:id" component={WorkflowEditor} />
      <Route path="/create-rule" component={CreateRule} />
      <Route path="/ai-workflow" component={AIWorkflowBuilder} />
      <Route path="/history" component={ExecutionHistory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </>
  );
}

export default App;

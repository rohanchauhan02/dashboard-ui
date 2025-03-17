import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  Panel,
  MarkerType,
  getConnectedEdges,
  getOutgoers,
  getIncomers,
  EdgeChange,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { cn } from "@/lib/utils";
import {
  Plus,
  ChevronDown,
  Zap,
  GitBranch,
  Database,
  MessageSquare,
  Settings,
  Cloud,
  Pencil,
  Trash2,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { nodeCategories } from "@/lib/utils";
import { BaseEdge, EdgeProps, getSmoothStepPath } from "reactflow";

interface NodeData {
  label: string;
  type: string;
  subtype: string;
  icon: string;
  color: string;
  config: Record<string, any>;
}

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
  onAddNode,
  onDeleteEdge,
}: EdgeProps & { onAddNode: () => void; onDeleteEdge: (id: string) => void }) => {
  const [hovered, setHovered] = useState(false);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeStyle = {
    strokeWidth: selected ? 1 : 1,
    stroke: selected ? "rgba(7, 6, 13, 0.3)" : (style?.stroke as string) || "rgba(28, 10, 188, 0.3)",
    opacity: 0.8,
    transition: "all 0.2s ease",
    filter: selected ? "drop-shadow(0 0 0px rgba(5, 4, 17, 0.3))" : "none",
    strokeDasharray: "none", // Ensures solid line
  };

  let customMarkerEnd: any = markerEnd;
  if (selected && markerEnd) {
    if (typeof markerEnd === "string") {
      customMarkerEnd = markerEnd;
    } else {
      customMarkerEnd = {
        type: MarkerType.ArrowClosed,
        width: 5,
        height: 5,
        color: "gba(5, 4, 17, 0.3)",
      };
    }
  }

  return (
    <g
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <BaseEdge path={edgePath} markerEnd={customMarkerEnd} style={edgeStyle} id={id} />
      {hovered && (
        <g>
          {/* Add Node Button */}
          <circle
            cx={labelX - 10}
            cy={labelY}
            r={8}
            fill="#4F46E5"
            cursor="pointer"
            onClick={onAddNode}
          />
          <text
            x={labelX - 10}
            y={labelY + 4}
            fill="#fff"
            fontSize={8}
            textAnchor="middle"
            cursor="pointer"
            onClick={onAddNode}
          >
            +
          </text>

          {/* Delete Edge Button */}
          <circle
            cx={labelX + 10}
            cy={labelY}
            r={8}
            fill="#E11D48"
            cursor="pointer"
            onClick={() => onDeleteEdge(id)}
          />
          <text
            x={labelX + 10}
            y={labelY + 4}
            fill="#fff"
            fontSize={8}
            textAnchor="middle"
            cursor="pointer"
            onClick={() => onDeleteEdge(id)}
          >
            ×
          </text>
        </g>
      )}
    </g>
  );
};

const nodeTypes = {
  custom: ({ data }: { data: NodeData }) => {
    const getColorClass = (color: string) => {
      switch (color) {
        case "blue":
          return "bg-blue-100 text-blue-600";
        case "orange":
          return "bg-orange-100 text-orange-600";
        case "purple":
          return "bg-purple-100 text-purple-600";
        case "green":
          return "bg-green-100 text-green-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    };

    return (
      <div className="flex flex-col items-center">
        <div className="rounded bg-gray-200 px-4 py-3 border border-blue-200 shadow-sm relative group hover:shadow-md transition-all duration-200">
          {/* Target Handle */}
          <Handle
            type="target"
            position={Position.Left}
            className="w-2 h-2 bg-blue-500 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ zIndex: 20, left: -2 }}
          />

          {/* Source Handle */}
          <Handle
            type="source"
            position={Position.Right}
            className="w-2 h-2 bg-blue-500 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ zIndex: 20, right: -6 }}
          />

          {/* Node Content */}
          <div className="flex items-center">
            {/* Icon Container */}
            <div
              className={cn(
                "w-3 h-3 rounded flex items-center justify-center",
                getColorClass(data.color)
              )}
            >
              <i className={data.icon} style={{ fontSize: "1rem" }}></i>
            </div>

            {/* Label */}
            {/* <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800 truncate">
                {data.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">{data.type}</div>
            </div> */}
          </div>
        </div>
        {/* Node Name Below */}
        <div className="text-[5px] text-black-500 mt-1">{data.label}</div>
      </div>
    );
  },
}

const edgeTypes = {
  custom: CustomEdge,
};

interface WorkflowCanvasProps {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: any) => void;
  onNodeClick: (node: Node) => void;
  onPaneClick: () => void;
}

const WorkflowCanvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onPaneClick,
}: WorkflowCanvasProps) => {
  const reactFlowInstance = useReactFlow();
  const edgeUpdateSuccessful = useRef(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [edgeMenuPosition, setEdgeMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Handle node drop on the canvas
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      // Get the node data from the drag event
      const nodeData = JSON.parse(event.dataTransfer.getData("application/reactflow"));

      // Calculate the position where the node is dropped
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create a new node
      const newNode: Node<NodeData> = {
        id: `node_${Date.now()}`, // Generate a unique ID
        type: "custom", // Use the custom node type
        position,
        data: {
          label: nodeData.name,
          type: nodeData.type,
          subtype: nodeData.subtype,
          icon: nodeData.icon,
          color: nodeData.color,
          config: {}, // Initial configuration
        },
      };

      // Add the new node to the nodes array
      onNodesChange([{ type: "add", item: newNode }]);
    },
    [reactFlowInstance, onNodesChange]
  );

  // Allow drop operation
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  // Handle node click
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    setEdgeMenuPosition(null);
    onNodeClick(node);
  };

  // Handle edge click
  const handleEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.stopPropagation();
      const rect = (event.target as Element).getBoundingClientRect();
      const centerX = (rect.left + rect.right) / 2;
      const centerY = (rect.top + rect.bottom) / 2;

      // Convert screen coordinates to flow coordinates
      const position = reactFlowInstance.screenToFlowPosition({
        x: centerX,
        y: centerY,
      });

      setSelectedEdge(edge);
      setSelectedNode(null);
      setEdgeMenuPosition(position);
    },
    [reactFlowInstance]
  );

  // Handle adding a node between edges
  const handleAddNodeBetween = useCallback(
    (nodeType: any) => {
      if (!selectedEdge || !edgeMenuPosition) return;

      // Create a new node
      const newNodeId = `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const newNode = {
        id: newNodeId,
        type: "custom",
        position: edgeMenuPosition,
        data: {
          label: nodeType.name,
          type: nodeType.type,
          subtype: nodeType.subtype,
          icon: nodeType.icon,
          color: nodeType.color,
          config: {},
        },
      };

      // Create two new edges: source -> new node and new node -> target
      const sourceToNewEdge = {
        id: `edge_${Date.now()}_1`,
        source: selectedEdge.source,
        target: newNodeId,
        style: selectedEdge.style,
        markerEnd: selectedEdge.markerEnd,
        animated: selectedEdge.animated,
      };

      const newToTargetEdge = {
        id: `edge_${Date.now()}_2`,
        source: newNodeId,
        target: selectedEdge.target,
        style: selectedEdge.style,
        markerEnd: selectedEdge.markerEnd,
        animated: selectedEdge.animated,
      };

      // Add the new node and edges, remove the old edge
      onNodesChange([{ type: "add", item: newNode }]);
      onEdgesChange([
        { type: "remove", id: selectedEdge.id },
        { type: "add", item: sourceToNewEdge },
        { type: "add", item: newToTargetEdge },
      ]);

      // Clear the selection
      setSelectedEdge(null);
      setEdgeMenuPosition(null);
    },
    [selectedEdge, edgeMenuPosition, onNodesChange, onEdgesChange]
  );

  // Handle edge updates
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: any) => {
      edgeUpdateSuccessful.current = true;
      onEdgesChange([
        {
          id: oldEdge.id,
          type: "remove",
        },
      ]);
      onConnect(newConnection);
    },
    [onConnect, onEdgesChange]
  );

  const onEdgeUpdateEnd = useCallback(
    (_: any, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
        onEdgesChange([
          {
            id: edge.id,
            type: "remove",
          },
        ]);
      }
      edgeUpdateSuccessful.current = true;
    },
    [onEdgesChange]
  );

  // Handle adding a node from the quick add menu
  const handleAddNode = useCallback(
    (nodeType: any) => {
      const { x, y, zoom } = reactFlowInstance.getViewport();
      const centerX = reactFlowInstance.screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }).x;
      const centerY = reactFlowInstance.screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }).y;

      // Create a new node
      const newNode = {
        id: `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        type: "custom",
        position: { x: centerX, y: centerY },
        data: {
          label: nodeType.name,
          type: nodeType.type,
          subtype: nodeType.subtype,
          icon: nodeType.icon,
          color: nodeType.color,
          config: {},
        },
      };

      // Add node to canvas
      onNodesChange([{ type: "add", item: newNode }]);
    },
    [reactFlowInstance, onNodesChange]
  );

  return (
    <div className="h-full w-full" onDragOver={onDragOver} onDrop={onDrop}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => handleNodeClick(node)}
        onPaneClick={() => {
          setSelectedNode(null);
          setSelectedEdge(null);
          setEdgeMenuPosition(null);
          onPaneClick();
        }}
        onEdgeClick={handleEdgeClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        fitView
        defaultEdgeOptions={{
          type: "custom",
          style: {
            strokeWidth: 1,
            stroke: "#94A3B8",
            opacity: 0.8,
            transition: "all 0.2s ease",
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 10,
            height: 10,
            color: "#94A3B8",
          },
          animated: true,
        }}
      >
        {/* Add Node Button */}
        <Panel position="top-left" className="mb-5 mr-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="bg-green-400 rounded-full border-2 shadow-lg h-14 w-14 bg-gradient-to-tr from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105"
                style={{ zIndex: 1000 }}
              >
                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-[1px]"></div>
                <Plus className="h-6 w-6 text-black relative z-10" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white w-64 p-2 max-h-[70vh] overflow-y-auto"
            >
              {nodeCategories.map((category) => (
                <div key={category.name} className="mb-3">
                  <div className="font-medium text-sm mb-2 px-2 text-gray-700 flex items-center">
                    {category.name === "Triggers" && (
                      <Zap className="h-3 w-3 mr-1.5 text-blue-500" />
                    )}
                    {category.name === "Logic" && (
                      <GitBranch className="h-3 w-3 mr-1.5 text-orange-500" />
                    )}
                    {category.name === "API & Data" && (
                      <Database className="h-3 w-3 mr-1.5 text-green-500" />
                    )}
                    {category.name === "Communication" && (
                      <MessageSquare className="h-3 w-3 mr-1.5 text-purple-500" />
                    )}
                    {category.name === "Project Tools" && (
                      <Settings className="h-3 w-3 mr-1.5 text-gray-500" />
                    )}
                    {category.name === "Cloud Services" && (
                      <Cloud className="h-3 w-3 mr-1.5 text-blue-400" />
                    )}
                    {category.name}
                  </div>
                  <div className="grid grid-cols-2 gap-1 px-1">
                    {category.items.map((item) => (
                      <DropdownMenuItem
                        key={item.name}
                        className="flex items-center cursor-pointer px-2 py-1.5 rounded-md hover:bg-gray-100"
                        onClick={() => handleAddNode(item)}
                      >
                        <div
                          className={cn(
                            "w-3 h-3 rounded-md flex items-center justify-center mr-2",
                            item.color === "blue"
                              ? "bg-blue-100 text-blue-600"
                              : item.color === "orange"
                              ? "bg-orange-100 text-orange-600"
                              : item.color === "purple"
                              ? "bg-purple-100 text-purple-600"
                              : item.color === "green"
                              ? "bg-green-100 text-green-600"
                              : item.color === "yellow"
                              ? "bg-yellow-100 text-yellow-600"
                              : item.color === "gray"
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-600"
                          )}
                        >
                          <i
                            className={item.icon}
                            style={{ fontSize: "12px" }}
                          ></i>
                        </div>
                        <span className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.name}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </Panel>

        {/* Node Context Menu */}
        {selectedNode && (
          <Panel position="top-right" className="mr-5 mt-5">
            <div className="flex flex-col gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-gray-200 bg-white shadow-sm"
                onClick={() => onNodeClick(selectedNode)}
                title="Edit Node"
              >
                <Pencil className="h-4 w-4 text-gray-600" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-gray-200 bg-white shadow-sm"
                onClick={() => {
                  onNodesChange([{ type: "remove", id: selectedNode.id }]);
                  onPaneClick();
                }}
                title="Delete Node"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-full border-gray-200 bg-white shadow-sm"
                onClick={() => {
                  const newNode = {
                    ...selectedNode,
                    id: `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                    position: {
                      x: selectedNode.position.x + 50,
                      y: selectedNode.position.y + 50,
                    },
                  };
                  onNodesChange([{ type: "add", item: newNode }]);
                }}
                title="Duplicate Node"
              >
                <Copy className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
          </Panel>
        )}

        {/* Edge Context Menu */}
        {selectedEdge && edgeMenuPosition && (
          <div
            className="absolute bg-white shadow-lg rounded-lg p-4 z-10 w-72"
            style={{
              left: edgeMenuPosition.x,
              top: edgeMenuPosition.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="text-sm font-medium mb-2 text-gray-700">
              Add Node Between Connection
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {nodeCategories
                .flatMap((category) => category.items)
                .filter((item) => item.type !== "Triggers")
                .slice(0, 8)
                .map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center cursor-pointer px-2 py-1.5 rounded-md hover:bg-gray-100"
                    onClick={() => handleAddNodeBetween(item)}
                  >
                    {/* <Plus className="h-4 w-4 mr-2" /> */}
                    <div
                      className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center mr-2",
                        item.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : item.color === "orange"
                          ? "bg-orange-100 text-orange-600"
                          : item.color === "purple"
                          ? "bg-purple-100 text-purple-600"
                          : item.color === "green"
                          ? "bg-green-100 text-green-600"
                          : item.color === "yellow"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      <i className={item.icon} style={{ fontSize: "10px" }}></i>
                    </div>
                    <span className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.name}
                    </span>
                  </div>
                ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-xs"
              onClick={() => {
                setSelectedEdge(null);
                setEdgeMenuPosition(null);
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        <Controls />
        <Background gap={20} size={1} color="#CBD5E0" />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;

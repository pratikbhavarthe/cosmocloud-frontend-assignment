import { useCallback, useContext, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  Connection,
  useReactFlow,
} from "reactflow";


import CustomNode from "./Node";
import { NodeContext, NodeInterface } from "../context/NodeContext";

const nodeTypes = {customNode: CustomNode}
const Flowchart = () => {
  const reactFlow = useReactFlow()
  const {nodes, edges, setEdges, onNodesChange, onEdgesChange} = useContext(NodeContext) as NodeInterface

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    reactFlow.setViewport({ x: 400, y: 10, zoom: 1 }, { duration: 800 })
  })
 
  return (
    <div className="flowchart-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Flowchart;

import React, { Dispatch, SetStateAction, createContext, useCallback } from "react";
import { Edge, EdgeChange, Node, NodeChange, getConnectedEdges, getIncomers, getOutgoers, useEdgesState, useNodesState } from "reactflow";

type HandleDelete = (node: Node) => void

export interface NodeInterface {
  handleDelete: HandleDelete,
  nodes: Node[],
  edges: Edge[],
  setEdges: Dispatch<SetStateAction<Edge[]>>,
  setNodes: Dispatch<SetStateAction<Node[]>>,
  onNodesChange: (changes: NodeChange[]) => void,
  onEdgesChange: (changes: EdgeChange[]) => void
}
export const NodeContext = createContext<NodeInterface | null>(null)

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, type:"customNode", data: { label: "Node 1" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" }];

export const NodeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleDelete: HandleDelete = (node: Node) => {
    setNodes((nds) => nds.filter(n => n.id !== node.id))
    onNodesDelete([node])
  }

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges, setEdges]
  );
  return (
    <NodeContext.Provider value={{handleDelete, nodes, edges, setEdges, setNodes, onNodesChange, onEdgesChange}}>
      {children}
    </NodeContext.Provider>
  )
}

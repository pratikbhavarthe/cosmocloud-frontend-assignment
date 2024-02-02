import { memo, useCallback, useContext } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { NodeContext, NodeInterface } from '../context/NodeContext';
import "./styles.css"


const CustomNode: React.FC<NodeProps> = memo((props) => {
  const { data } = props
  const reactFlow = useReactFlow()
  const {handleDelete} = useContext(NodeContext) as NodeInterface

  const getPosition = useCallback( () => {
    const lastNode = reactFlow.getNodes()[0]
    const newPosition = {x: lastNode.position.x, y: lastNode.position.y + 150}
    return newPosition
  }, [reactFlow])

  const getPosition3Centre = useCallback(() => {
    const lastNode = reactFlow.getNodes()[0]
    const centerNode = { x: lastNode.position.x, y: lastNode.position.y + 150}
    return centerNode
  }, [reactFlow])

  const getPosition3Right = useCallback(() => {
    const lastNode = reactFlow.getNodes()[0]
    const rightNode = { x: lastNode.position.x-200, y: lastNode.position.y + 150}
    return rightNode
  }, [reactFlow])

  const getPosition3Left = useCallback(() => {
    const lastNode = reactFlow.getNodes()[0]
    const leftNode = { x: lastNode.position.x+200, y: lastNode.position.y + 150}
    return leftNode
  }, [reactFlow])

  const getSource = useCallback(() => {
    const lastNode = reactFlow.getNodes()[0]
    return lastNode.id
  }, [reactFlow])

  const onAddNode = useCallback(() => {
    const newNodeId = String(Date.now())
    reactFlow.addNodes([
      {
        id: newNodeId,
        position: getPosition(),
        type: "customNode",
        data: { label: `Node ${reactFlow.getNodes().length+1}` },
      },
    ]);
    reactFlow.addEdges([
      {
        id: String(Date.now()),
        source: getSource(),
        target: newNodeId,
      }
    ])
  }, [reactFlow, getPosition, getSource]);

  const onAddThreeNodes = useCallback(() => {
    const newNodeId1 = String(Date.now()) + '-1';
    const newNodeId2 = String(Date.now()) + '-2';
    const newNodeId3 = String(Date.now()) + '-3';
  
    reactFlow.addNodes([
      {
        id: newNodeId1,
        position: getPosition3Centre(),
        type: "customNode",
        data: { label: `Node ${reactFlow.getNodes().length+1}` },
      },
      {
        id: newNodeId2,
        position: getPosition3Left(),
        type: "customNode",
        data: { label: `Node ${reactFlow.getNodes().length+2}` },
      },
      {
        id: newNodeId3,
        position: getPosition3Right(),
        type: "customNode",
        data: { label: `Node ${reactFlow.getNodes().length+3}` },
      },
    ]);
  
    reactFlow.addEdges([
      {
        id: `${String(Date.now())}-1`,
        source: getSource(),
        target: newNodeId1,
        type: 'smoothstep',
      },
      {
        id: `${String(Date.now())}-2`,
        source: newNodeId1,
        target: newNodeId2,
        type: 'smoothstep',
      },
      {
        id: `${String(Date.now())}-3`,
        source: newNodeId1,
        target: newNodeId3,
        type: 'smoothstep',
      },
    ]);
  
  }, [reactFlow, getSource, getPosition3Centre, getPosition3Left, getPosition3Right]);

  return (
    <div className="node-container">
      <Handle
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div className='node-title'>{data.label}</div>
      <div className='node-btn-container'>
        <button className='node-btn' onClick={onAddNode}>+</button>
        <button className='node-btn' onClick={onAddThreeNodes}>++</button>
        <button className='node-btn' onClick={() => handleDelete({...props, position:{x: props.xPos, y: props.yPos}})}>x</button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </div>

  );
});

export default CustomNode;
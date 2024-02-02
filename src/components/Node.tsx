import { memo, useCallback, useContext } from 'react';
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { NodeContext, NodeInterface } from'../context/NodeContext';

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
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReactFlowProvider } from 'reactflow'
import { NodeProvider } from './context/NodeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <NodeProvider>
        <App />
      </NodeProvider>
    </ReactFlowProvider>
  </React.StrictMode>,
)

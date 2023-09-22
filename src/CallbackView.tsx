import React from 'react'
import ReactDOM from 'react-dom/client'

const CallbackView: React.FC = () => {
  return <div>callback</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CallbackView />
  </React.StrictMode>,
)

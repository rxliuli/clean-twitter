import React from 'react'
import ReactDOM from 'react-dom/client'
import { useMount } from 'react-use'

const CallbackView: React.FC = () => {
  useMount(() => {
    console.log('onMount')
    const p = new URLSearchParams(location.search)
    window.postMessage(
      {
        type: 'FROM_PAGE',
        data: {
          code: p.get('code'),
          state: JSON.parse(p.get('state')!),
        },
      },
      '*',
    )
  })
  return <div>callback</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CallbackView />,
)

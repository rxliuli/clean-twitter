import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './styles.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import App from './App.tsx'
import { ReduxProvider } from '@/store/ReduxProvider'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </ReactQueryProvider>
  </StrictMode>,
)

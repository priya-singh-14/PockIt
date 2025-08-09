import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Base from './components/base.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Base />
  </StrictMode>,
)

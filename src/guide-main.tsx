import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import GuidePage from './pages/GuidePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GuidePage />
  </StrictMode>,
)

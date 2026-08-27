import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import PrivacyPage from './pages/PrivacyPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
)

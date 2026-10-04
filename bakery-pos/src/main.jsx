import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductManager from './components/ProductManager'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)

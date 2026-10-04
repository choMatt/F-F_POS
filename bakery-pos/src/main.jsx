import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ProductManager from './components/ProductManager'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ProductManager />
  </StrictMode>,
)

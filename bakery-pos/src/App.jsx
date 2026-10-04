import { useState } from 'react'
import Checkout from './components/Checkout'
import ProductManager from './components/ProductManager'
import './App.css'

export default function App() {
  const [tab, setTab] = useState('pos')

  return (
    <>
      <nav className="app-nav">
        <button className={tab === 'pos' ? 'active' : ''} onClick={() => setTab('pos')}>
          POS
        </button>
        <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>
          Products
        </button>
      </nav>
      {tab === 'pos' ? <Checkout /> : <ProductManager />}
    </>
  )
}
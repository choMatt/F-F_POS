import { useState } from 'react'
import Checkout from './components/Checkout'
import ProductManager from './components/ProductManager'
import Orders from './components/Orders'
import Settings from './components/Settings'
import './App.css'

const TABS = [
  { id: 'pos', label: 'POS' },
  { id: 'orders', label: 'Orders' },
  { id: 'products', label: 'Products' },
  { id: 'settings', label: 'Settings' },
]

export default function App() {
  const [tab, setTab] = useState('pos')

  return (
    <>
      <nav className="app-nav">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? 'active' : ''}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      {tab === 'pos' && <Checkout />}
      {tab === 'orders' && <Orders />}
      {tab === 'products' && <ProductManager />}
      {tab === 'settings' && <Settings />}
    </>
  )
}
import { useState } from 'react'

const toPesos = (centavos) => (centavos / 100).toFixed(2)

export default function ProductForm({ product, categories, onSave, onCancel }) {
  const [name, setName] = useState(product?.name ?? '')
  const [price, setPrice] = useState(product ? toPesos(product.price) : '')
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? '')
  const [saleType, setSaleType] = useState(product?.saleType ?? 'single')
  const [boxSize, setBoxSize] = useState(product?.boxSize ?? 6)
  const [isActive, setIsActive] = useState(product?.isActive ?? true)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmed = name.trim()
    const pesos = parseFloat(price)

    if (!trimmed) return setError('Name is required.')
    if (Number.isNaN(pesos) || pesos < 0) return setError('Enter a valid price.')
    if (!categoryId) return setError('Choose a category.')
    if (saleType === 'box' && (!Number.isInteger(+boxSize) || +boxSize < 2)) {
      return setError('Box size must be a whole number of 2 or more.')
    }

    onSave({
      name: trimmed,
      price: Math.round(pesos * 100), // store as centavos
      categoryId: Number(categoryId),
      saleType,
      boxSize: saleType === 'box' ? Number(boxSize) : null,
      isActive,
    })
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{product ? 'Edit product' : 'Add product'}</h2>

      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
      </label>

      <label>
        Price (₱)
        <input
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <label>
        Category
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select…</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend>Sold as</legend>
        <label className="inline">
          <input
            type="radio"
            checked={saleType === 'single'}
            onChange={() => setSaleType('single')}
          />
          Individually
        </label>
        <label className="inline">
          <input
            type="radio"
            checked={saleType === 'box'}
            onChange={() => setSaleType('box')}
          />
          Box
        </label>
      </fieldset>

      {saleType === 'box' && (
        <label>
          Pieces per box
          <input
            type="number"
            min="2"
            step="1"
            value={boxSize}
            onChange={(e) => setBoxSize(e.target.value)}
          />
        </label>
      )}

      <label className="inline">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Available for sale
      </label>

      {error && <p className="error">{error}</p>}

      <div className="actions">
        <button type="submit">Save</button>
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
import { db } from './db'

export async function createOrder({ items, paymentMethod, amountPaid }) {
  if (items.length === 0) throw new Error('Cart is empty.')

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const total = subtotal // discounts/fees can adjust this later

  if (amountPaid < total) throw new Error('Amount paid is less than the total.')

  const order = {
    createdAt: Date.now(),
    status: 'completed',
    paymentMethod,
    // name and price are copied so old receipts never change
    items: items.map(({ productId, name, price, qty }) => ({
      productId, name, price, qty,
    })),
    subtotal,
    total,
    amountPaid,
    change: amountPaid - total,
  }

  const id = await db.orders.add(order)
  return { id, ...order }
}
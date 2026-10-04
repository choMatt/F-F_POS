import Dexie from 'dexie'

export const db = new Dexie('bakery-pos')

// Only indexed fields are listed here. Other fields can still be stored on records.
db.version(1).stores({
  categories: '++id, name, sortOrder',
  products: '++id, name, categoryId, isActive',
  orders: '++id, createdAt, status, paymentMethod',
  settings: 'key',
})

// Runs once, when the database is first created.
db.on('populate', (tx) => {
  tx.table('categories').bulkAdd([
    { name: 'Cookies', sortOrder: 1 },
    { name: 'Crinkles', sortOrder: 2 },
    { name: 'Brownies', sortOrder: 3 },
    { name: 'Boxed Assortments', sortOrder: 4 },
  ])

  tx.table('settings').bulkAdd([
    { key: 'businessName', value: 'My Bakery' },
    { key: 'currency', value: 'PHP' },
    { key: 'currencySymbol', value: '₱' },
  ])
})
import 'dotenv/config'
import Database from 'better-sqlite3'

export class Client {
  #dbpath = null
  #categories = [
    'WET',
    'DRY',
    'FOOD',
    'ALCOHOL',
    'DRINK',
    'TEA_COFFEE',
    'SNACKS',
    'MISC',
    'DELETED',
  ]

  db = null

  constructor(dbpath = process.env.DATABASE) {
    if (!dbpath) {
      console.error(`invalid database path`)
      return
    }
    this.#dbpath = dbpath
    this.open()

    // prepare the statements used in the transactions
    this.insertClosure = this.db.prepare(
      `INSERT INTO closures (id, register, staff, dateFrom, dateTo, sales, total) 
        VALUES (@id, @register, @staff, @dateFrom, @dateTo, @sales, @total)`,
    )

    this.insertPayment = this.db.prepare(
      `INSERT INTO payments (closureId, method, expected, counted, variance)
          VALUES (?, @method, @expected, @counted, @variance)`,
    )

    this.insertCategory = this.db.prepare(
      `INSERT INTO categories (closureId, category, quantity, grossSales, discounts, totalSales, vat, netSales)
          VALUES (?, ?, @quantity, @grossSales, @discounts, @totalSales, @vat, @netSales)`,
    )

    this.insertManyCategories = this.db.transaction((closure) => {
      for (const category of this.#categories) {
        this.insertCategory.run(closure.id, category, closure[category])
      }
    })

    this.insertManyPayments = this.db.transaction((closure) => {
      for (const payment of closure.payments)
        this.insertPayment.run(closure.id, payment)
    })

    this.insert = this.db.transaction((closure) => {
      const newClosure = structuredClone(closure)

      // required as FROM is a reserved SQL keyword!
      newClosure.dateFrom = newClosure.from
      newClosure.dateTo = newClosure.to

      const closureResult = this.insertClosure.run(newClosure)
      console.log(`create closure`, closureResult)

      this.insertManyPayments(closure)
      console.log(`create payments`)

      this.insertManyCategories(closure)
      console.log(`create categories`)
    })
  }

  async open() {
    this.db = new Database(this.#dbpath, {
      fileMustExist: true,
      verbose: console.log,
    })
    this.db.pragma('journal_mode = WAL')
    console.log(`db open`, this.db.name)
  }
  async close() {
    console.log(`db close `, this.db.name)
    this.db.close()
  }

  async create(closure) {
    this.insert(closure)
  }

  async read(closureId) {}

  // update can only occur to a subset of the closure fields... namely
  //
  async update(closure) {}

  async delete(closureId) {
    const deleteClosure = this.db.prepare('DELETE FROM closures WHERE id = ?')
    deleteClosure.run(closureId)
  }
}

const DB = new Client()

const data = [
  {
    id: '4204ebe2-437d-4d8a-866e-f5c626abe4f9',
    register: 'Members Bar',
    staff: 'Peter Finlan',
    from: '2024-01-03T21:47:42+00:00',
    to: '2024-01-04T22:35:53+00:00',
    payments: [
      {
        method: 'cash',
        expected: 210.52,
        counted: 210.52,
        variance: 0,
      },
      {
        method: 'sumup',
        expected: 1134.52,
        counted: 1134.52,
        variance: 0,
      },
    ],
    sales: 153,
    total: 1345.04,
    WET: {
      quantity: 136,
      grossSales: 473.39,
      discounts: 22.46,
      totalSales: 450.93,
      vat: 74.92,
      netSales: 376.01,
      list: [],
    },
    DRY: {
      quantity: 175,
      grossSales: 891,
      discounts: 0,
      totalSales: 891,
      vat: 148.37,
      netSales: 742.63,
      list: [],
    },
    FOOD: {
      quantity: 175,
      grossSales: 891,
      discounts: 0,
      totalSales: 891,
      vat: 148.37,
      netSales: 742.63,
      list: [],
    },
    ALCOHOL: {
      quantity: 55,
      grossSales: 279.08,
      discounts: 20.51,
      totalSales: 258.57,
      vat: 42.99,
      netSales: 215.58,
      list: [],
    },
    DRINK: {
      quantity: 81,
      grossSales: 194.31,
      discounts: 1.95,
      totalSales: 192.36,
      vat: 31.93,
      netSales: 160.43,
      list: [],
    },
    TEA_COFFEE: {
      quantity: 62,
      grossSales: 158,
      discounts: 0,
      totalSales: 158,
      vat: 26.41,
      netSales: 131.59,
      list: [],
    },
    SNACKS: {
      quantity: 24,
      grossSales: 26.35,
      discounts: 0,
      totalSales: 26.35,
      vat: 4.31,
      netSales: 22.04,
      list: [],
    },
    MISC: {
      quantity: 1,
      grossSales: 3.5,
      discounts: 0,
      totalSales: 3.5,
      vat: 0,
      netSales: 3.5,
      list: [],
    },
    DELETED: {
      quantity: 0,
      grossSales: 0,
      discounts: 0,
      totalSales: 0,
      vat: 0,
      netSales: 0,
      list: [],
    },
  },
  {
    id: 'f0655ea9-ed6e-400d-870c-f818b55b51bd',
    register: 'Members Bar',
    staff: 'Peter Finlan',
    from: '2024-01-01T20:50:34+00:00',
    to: '2024-01-02T21:32:23+00:00',
    payments: [
      {
        method: 'cash',
        expected: 57.38,
        counted: 57.38,
        variance: 0,
      },
      {
        method: 'sumup',
        expected: 143.56,
        counted: 143.56,
        variance: 0,
      },
    ],
    sales: 35,
    total: 200.94,
    WET: {
      quantity: 44,
      grossSales: 181.91,
      discounts: 25.92,
      totalSales: 155.99,
      vat: 25.93,
      netSales: 130.06,
      list: [],
    },
    DRY: {
      quantity: 23,
      grossSales: 44.95,
      discounts: 0,
      totalSales: 44.95,
      vat: 7.49,
      netSales: 37.46,
      list: [],
    },
    FOOD: {
      quantity: 23,
      grossSales: 44.95,
      discounts: 0,
      totalSales: 44.95,
      vat: 7.49,
      netSales: 37.46,
      list: [],
    },
    ALCOHOL: {
      quantity: 30,
      grossSales: 150.32,
      discounts: 22.57,
      totalSales: 127.75,
      vat: 21.25,
      netSales: 106.5,
      list: [],
    },
    DRINK: {
      quantity: 14,
      grossSales: 31.59,
      discounts: 3.35,
      totalSales: 28.24,
      vat: 4.68,
      netSales: 23.56,
      list: [],
    },
    TEA_COFFEE: {
      quantity: 14,
      grossSales: 35.5,
      discounts: 0,
      totalSales: 35.5,
      vat: 5.96,
      netSales: 29.54,
      list: [],
    },
    SNACKS: {
      quantity: 9,
      grossSales: 9.45,
      discounts: 0,
      totalSales: 9.45,
      vat: 1.53,
      netSales: 7.92,
      list: [],
    },
    MISC: {
      quantity: 0,
      grossSales: 0,
      discounts: 0,
      totalSales: 0,
      vat: 0,
      netSales: 0,
      list: [],
    },
    DELETED: {
      quantity: 0,
      grossSales: 0,
      discounts: 0,
      totalSales: 0,
      vat: 0,
      netSales: 0,
      list: [],
    },
  },
]

DB.create(data[0])
DB.create(data[1])
// DB.delete('foo-bar-baz')

process.on('exit', async () => await DB.close())
process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))

export default DB

import { Counter } from '../../src/store/counter.js'

describe('fetch', () => {
  test('Set a value of count', async () => {
    const counter = new Counter('localhost')
    await counter.fetch(() => Promise.resolve({count: 10}))

    expect(counter.count).toEqual(10)
  })

  test('A value of count is not set when failure to fetch', () => {
    const counter = new Counter('localhost')
    counter.fetch(() => ({}))

    expect(counter.count).toEqual(0)
  })
})

describe('increment', () => {
  test('Should increment', () => {
    const counter = new Counter('localhost')
    counter.increment()
    expect(counter.count).toEqual(1)
    counter.increment()
    expect(counter.count).toEqual(2)
  })
})

describe('save', () => {
  test('Should call save method', () => {
    const counter = new Counter('localhost')
    const saveRecord = jest.fn()
    counter.increment()
    counter.save(saveRecord)

    expect(saveRecord).toHaveBeenCalledWith('CounterStore', {url: 'localhost', count: 1})
  })
})

export class ParameterMissingError extends Error {}

export class Counter {
  #url = null
  #count = 0

  constructor(url) {
    if (!url || typeof url !== 'string') {
      throw new ParameterMissingError('Url parameter is empty')
    }

    this.#url = url
  }

  get count() {
    return this.#count
  }

  async fetch(getRecord) {
    const countRecord = await getRecord('CounterStore', 'url', this.#url)

    if (countRecord && countRecord.count) {
      this.#count = parseInt(countRecord.count)
    }
  }

  increment() {
    this.#count++
  }

  save(saveRecord) {
    saveRecord('CounterStore', {url: this.#url, count: this.#count})
  }
}

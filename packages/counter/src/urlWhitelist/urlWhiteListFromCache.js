import { UrlWhiteList } from './urlWhiteList.js'

export class UrlWhiteListFromCache extends UrlWhiteList {
  #getObject = null
  #saveObject = null
  #sitemapUrls = []

  constructor(getObject, saveObject) {
    super()

    this.#getObject = getObject
    this.#saveObject = saveObject
  }

  get urls() {
    return this.#sitemapUrls
  }

  async fetch() {
    const text = await this.#getObject()
    const urls = JSON.parse(text)

    this.#sitemapUrls = urls
  }

  async update(fromWhiteList) {
    this.#sitemapUrls = fromWhiteList.urls
    this.#saveObject(JSON.stringify(this.#sitemapUrls))
  }
}

import { UrlWhiteList } from './urlWhiteList.js'
import { XMLParser } from 'fast-xml-parser'
import fetch from 'node-fetch'

export class UrlWhiteListFromSitemap extends UrlWhiteList {
  #url = ''
  #parser = null
  #sitemapUrls = []

  constructor(url) {
    super()

    this.#parser = new XMLParser({ignoreAttributes: true})
    this.#url = new URL(url)
  }

  get urls() {
    return this.#sitemapUrls
  }

  async fetch() {
    this.#sitemapUrls = []

    const parsed = await this.#fetchXml(this.#url.href)

    if (parsed.sitemapindex && parsed.sitemapindex.sitemap) {
      const locations = Array.isArray(parsed.sitemapindex.sitemap) ?
        parsed.sitemapindex.sitemap.map(sitemap => sitemap.loc) :
        [parsed.sitemapindex.sitemap.loc]
      const responses = await Promise.all(locations.map(loc => this.#fetchXml(loc)))
      responses.forEach(response => this.#setUrlList(response))
    } else if (parsed.urlset && parsed.urlset.url) {
      this.#setUrlList(parsed)
    }
  }

  #setUrlList(parsed) {
    if (!parsed.urlset || !parsed.urlset.url) return

    this.#sitemapUrls = [...this.#sitemapUrls, ...parsed.urlset.url.map(url => url.loc)]
  }

  async #fetchXml(url) {
    const response = await fetch(url)
    const xml = await response.text()
    return this.#parser.parse(xml)
  }
}

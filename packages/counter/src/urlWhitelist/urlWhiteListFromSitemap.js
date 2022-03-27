import { UrlWhiteList } from './urlWhiteList.js'
import { SitemapToUrlList, SitemapRequestor } from '@piyoppi/counter-tools-url-whitelist-sitemap'

export class UrlWhiteListFromSitemap extends UrlWhiteList {
  #sitemapToUrlList = null

  constructor(url) {
    super()

    this.#sitemapToUrlList = new SitemapToUrlList(url, new SitemapRequestor())
  }

  get urls() {
    return this.#sitemapToUrlList.urls
  }

  fetch() {
    return this.#sitemapToUrlList.fetch()
  }
}

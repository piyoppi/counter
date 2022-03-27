import fetch from 'node-fetch'

export class SitemapRequestor {
  async fetch(url) {
    const response = await fetch(url)
    return await response.text()
  }
}

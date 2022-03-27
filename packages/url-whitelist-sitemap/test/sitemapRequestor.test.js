jest.mock('node-fetch')

import { SitemapRequestor } from '../src/sitemapRequestor.js'
import fetch from 'node-fetch'
const { Response } = jest.requireActual('node-fetch')

const siteMapIndexXml = `
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://localhost/sitemap/sitemap-0.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://localhost/sitemap/sitemap-1.xml</loc>
    </sitemap>
  </sitemapindex>
`

fetch.mockImplementation((url) => {
  switch(url) {
    case 'https://localhost/sitemap/index.xml': return Promise.resolve(new Response(siteMapIndexXml))
  }
})

describe('fetch', () => {
  test('Should return sitemap text', async () => {
    const requestor = new SitemapRequestor()
    expect(await requestor.fetch('https://localhost/sitemap/index.xml')).toEqual(siteMapIndexXml)
  })
})

jest.mock('node-fetch')

import fetch from 'node-fetch'
const { Response } = jest.requireActual('node-fetch')
import { UrlWhiteListFromSitemap } from '../../src/urlWhitelist/urlWhiteListFromSitemap.js'

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

const siteMapIndex2Xml = `
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://localhost/sitemap/sitemap-0.xml</loc>
    </sitemap>
  </sitemapindex>
`

const siteMapXml = [
  `
    <urlset>
      <url>
        <loc>https://localhost/posts/1</loc>
      </url>
      <url>
        <loc>https://localhost/posts/2</loc>
      </url>
    </urlset>
  `,
  `
    <urlset>
      <url>
        <loc>https://localhost/posts/3</loc>
      </url>
      <url>
        <loc>https://localhost/posts/4</loc>
      </url>
    </urlset>
  `
]

fetch.mockImplementation((url) => {
  switch(url) {
    case 'https://localhost/sitemap/index.xml': return Promise.resolve(new Response(siteMapIndexXml))
    case 'https://localhost/sitemap/index2.xml': return Promise.resolve(new Response(siteMapIndex2Xml))
    case 'https://localhost/sitemap/sitemap-0.xml': return Promise.resolve(new Response(siteMapXml[0]))
    case 'https://localhost/sitemap/sitemap-1.xml': return Promise.resolve(new Response(siteMapXml[1]))
  }
})

describe('fetch', () => {
  test('Should set parsed sitemap', async () => {
    const sitemapIndex = new UrlWhiteListFromSitemap('https://localhost/sitemap/index.xml')
    await sitemapIndex.fetch()

    expect(sitemapIndex.urls).toEqual([
      'https://localhost/posts/1',
      'https://localhost/posts/2',
      'https://localhost/posts/3',
      'https://localhost/posts/4'
    ])

    const sitemapIndex2 = new UrlWhiteListFromSitemap('https://localhost/sitemap/index2.xml')
    await sitemapIndex2.fetch()

    expect(sitemapIndex2.urls).toEqual([
      'https://localhost/posts/1',
      'https://localhost/posts/2'
    ])

    const sitemap = new UrlWhiteListFromSitemap('https://localhost/sitemap/sitemap-0.xml')
    await sitemap.fetch()

    expect(sitemap.urls).toEqual([
      'https://localhost/posts/1',
      'https://localhost/posts/2'
    ])
  })
})

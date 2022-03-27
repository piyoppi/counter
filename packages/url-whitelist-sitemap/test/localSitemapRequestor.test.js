import { LocalSitemapRequestor } from '../src/localSitemapRequestor.js'
import fs from 'fs'
import path from 'path'

describe('fetch', () => {
  test('Should return sitemap text', async () => {
    const baseDir = __dirname
    const requestor = new LocalSitemapRequestor('https://localhost/sitemap/', `${baseDir}/files/`)
    const expected = fs.readFileSync(`${baseDir}/files/index.xml`)
    expect(await requestor.fetch('https://localhost/sitemap/index.xml')).toEqual(expected)
  })
})

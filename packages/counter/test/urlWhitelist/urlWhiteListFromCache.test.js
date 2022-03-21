import { UrlWhiteListFromCache } from '../../src/urlWhitelist/urlWhiteListFromCache.js'

describe('fetch', () => {
  test('Should update sitemapUrls', async () => {
    const cachedUrls = [
      'http://localhost/1',
      'http://localhost/2',
      'http://localhost/3',
    ]
    const getObjectMock = jest.fn().mockReturnValue(Promise.resolve(JSON.stringify(cachedUrls)))
    const urls = new UrlWhiteListFromCache(getObjectMock, jest.fn())
    
    await urls.fetch()

    expect(urls.urls).toEqual(cachedUrls)
  })
})

describe('update', () => {
  test('Should call saveObject', async () => {
    const saveObjectMock = jest.fn().mockReturnValue(Promise.resolve())
    const urls = new UrlWhiteListFromCache(jest.fn(), saveObjectMock)
    const updatedUrls = ['http://localhost/new']
    const fromWhiteList = {
      urls: updatedUrls
    }

    urls.update(fromWhiteList)

    expect(saveObjectMock).toHaveBeenCalledWith(JSON.stringify(updatedUrls))
  })
})

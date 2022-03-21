process.env.DOMAIN = 'localhost'
process.env.SITEMAP_URL = 'http://localhost/sitemap.xml'

jest.mock('../src/adapter/aws/store.js', () => ({
  __esModule: true,
  getRecord: () => Promise.resolve({count: 1}),
  saveRecord: () => Promise.resolve({})
}))

jest.mock('../src/adapter/aws/cacheStore.js', () => ({
  __esModule: true,
  getObject: () => Promise.resolve(JSON.stringify(['http://localhost', 'http://valid.example'])),
  saveObject: () => Promise.resolve(),
}))

jest.mock('../src/urlWhitelist/urlWhiteListFromSitemap.js')

describe('increment', () => {
  it('Should return the value of count', async () => {
    const app = require('../src/handler.js')
    expect(await app.increment({body: JSON.stringify({url: 'http://localhost'})})).toEqual({statusCode: 200, body: JSON.stringify({count: 2})})
  })

  it('Should return failed response when invalid url is given', async () => {
    const app = require('../src/handler.js')
    expect(await app.increment({body: JSON.stringify({url: 'http://invalid.example.com'})})).toEqual({statusCode: 400, body: expect.anything()})
  })

  it('Should return failed response when a parameter of url is not given', async () => {
    const app = require('../src/handler.js')
    expect(await app.increment({body: JSON.stringify({foo: 'http://invalid.example'})})).toEqual({statusCode: 400, body: expect.anything()})
  })
})

describe('current', () => {
  it('Should return the value of count', async () => {
    const app = require('../src/handler.js')
    expect(await app.current({queryStringParameters: {url: 'http://localhost'}})).toEqual({statusCode: 200, body: JSON.stringify({count: 1})})
  })

  it('Should return failed response when invalid url is given', async () => {
    const app = require('../src/handler.js')
    expect(await app.current({queryStringParameters: {url: 'http://invalid.example'}})).toEqual({statusCode: 400, body: expect.anything()})
  })
})

describe('updateUrlList', () => {
  it('Should return the value of count', async () => {
    const app = require('../src/handler.js')
    expect(await app.updateUrlList({})).toEqual({statusCode: 201, body: expect.anything()})
  })
})

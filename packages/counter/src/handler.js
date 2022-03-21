'use strict'

import { getRecord, saveRecord } from './adapter/aws/store.js'
import { getObject, saveObject } from './adapter/aws/cacheStore.js'

import { Counter } from './store/counter.js'
import { handleError } from './errorHandler.js'

import { checkHasUrl } from './urlWhitelist/checker.js'
import { UrlWhiteListFromCache } from './urlWhitelist/urlWhiteListFromCache.js'
import { UrlWhiteListFromSitemap } from './urlWhitelist/urlWhiteListFromSitemap.js'

const bucket = process.env.URLLIST_BUCKET
const urlListKey = process.env.URLLIST_KEY
const sitemapUrl = process.env.SITEMAP_URL

const createUrlListFromCache = () => {
  const urls = new UrlWhiteListFromCache(
    () => getObject(bucket, urlListKey),
    body => saveObject(bucket, urlListKey, body)
  )

  return urls
}

/**
 * Increment count
 *
 * @param {object} event
 * @param {string} event.body request body (application/json)
 */
export const increment = async (event) => {
  const params = JSON.parse(event.body)

  try {
    const urlList = createUrlListFromCache()
    await urlList.fetch()
    checkHasUrl(urlList, params.url)

    const counter = new Counter(params.url)

    await counter.fetch(getRecord)
    counter.increment()
    await counter.save(saveRecord)

    return {
      statusCode: 200,
      body: JSON.stringify({count: counter.count})
    }
  } catch(e) {
    return handleError(e)
  }
}

/**
 * Get current value
 *
 * @param {object} event
 * @param {object} event.queryStringParameters
 * @param {string} event.queryStringParameters.url target url
 */
export const current = async (event) => {
  try {
    const url = event.queryStringParameters.url

    const urlList = createUrlListFromCache()
    await urlList.fetch()
    checkHasUrl(urlList, url)

    const counter = new Counter(url)

    await counter.fetch(getRecord)

    return {
      statusCode: 200,
      body: JSON.stringify({count: counter.count})
    }
  } catch(e) {
    return handleError(e)
  }
}

/**
 * Update url whitelist
 *
 * @param {object} event
 */
export const updateUrlList = async (event) => {
  try {
    const currentUrlList = new UrlWhiteListFromSitemap(sitemapUrl)
    const cachedUrlList = createUrlListFromCache()
    await currentUrlList.fetch()
    cachedUrlList.update(currentUrlList)

    return {
      statusCode: 201,
      body: '{}'
    }
  } catch(e) {
    return handleError(e)
  }
}

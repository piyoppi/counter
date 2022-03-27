import fs from 'fs'

export class LocalSitemapRequestor {
  #baseUrl = ''
  #baseDir = ''

  constructor(baseUrl, baseDir) {
    this.#baseUrl = baseUrl
    this.#baseDir = baseDir
  }

  fetch(url) {
    const filename = url.replace(this.#baseUrl, this.#baseDir)
    return Promise.resolve(fs.readFileSync(filename))
  }
}

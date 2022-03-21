export class UnpermittedUrlError extends Error {}

export const checkHasUrl = (urlWhitelist, url) => {
  if (urlWhitelist.urls.indexOf(url) < 0) {
    throw new UnpermittedUrlError('The unpermitted url was given.')
  }
}

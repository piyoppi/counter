import { ParameterMissingError } from './store/counter.js'
import { UnpermittedUrlError } from './urlWhitelist/checker.js'

export const handleError = (e) => {
  if (e instanceof ParameterMissingError) {
    return {
      statusCode: 400,
      body: JSON.stringify({message: e.message})
    }
  }

  if (e instanceof UnpermittedUrlError) {
    return {
      statusCode: 400,
      body: JSON.stringify({message: e.message})
    }
  }

  return {
    statusCode: 500,
    body: JSON.stringify({message: 'Internal Server Error (1)'})
  }
}

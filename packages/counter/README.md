# @piyoppi/counter-api

Counter apis running on the AWS.

## Deploying

This application is managed using Serverless Framework.
To deploy, you will need to install serverless on your machine.

You can deploy with the following command.

```
 serverless deploy \
   --param='sitemap=https://example.com/sitemap/sitemap-index.xml' \
   --param='bucket=counter-settings' \
   --param='urllist=urllist' \
   --param='origin=http://localhost:3000'
```

| Parameter | Detail |
| --- | --- |
| sitemap | SiteMap URL |
| bucket | S3 Bucket for caching |
| urllist | The key of the content containing the whitelist URL |
| origin | Origin from which to send the request (for CORS) |

## APIs

The API provided by this application is as follows.

| Path | Query Parameters | Body | Detail |
| --- | --- | --- | --- |
| POST /count | - | `{"url": "the url of page"}` | Increment count |
| GET /current | `url=(the url of page)` | - | Get the current value of count |
| POST /update-url | - | - | Update whitelist url using sitemap |

The request and response format is `application/json`.

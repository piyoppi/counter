# @piyoppi/counter-api

Counte apis running on the AWS.

## Deploying

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

| Path | Query Parameters | Body | Detail |
| --- | --- | --- | --- |
| POST /count | - | `{"url": "the url of page"}` | Increment count |
| GET /current | `url=(the url of page)` | - | Get the current value of count |
| POST /update-url | - | - | Update whitelist url using sitemap |

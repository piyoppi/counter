import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

export const getObject = async (bucket, key) => {
  const response = await new S3Client().send(new GetObjectCommand({Bucket: bucket, Key: key}))
  const stream = response.Body
  
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

export const saveObject = async (bucket, key, body) => {
  await new S3Client().send(new PutObjectCommand({Bucket: bucket, Key: key, Body: body}))
}

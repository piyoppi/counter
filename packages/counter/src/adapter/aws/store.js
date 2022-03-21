import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'

export const removeTypeKey = (attr) => {
  return Object.keys(attr)
    .map(key => [key, Object.values(attr[key])])
    .reduce((acc, val) => {acc[val[0]] = val[1][0]; return acc}, {})
}

export const setTypeKey = (attr) => {
  return Object.keys(attr)
    .reduce((acc, key) => {
      acc[key] = typeof attr[key] === 'number' ?  {N: attr[key].toString()} : {S: attr[key]};
      return acc
    }, {})
}

export const getRecord = async (tableName, key, keyValue) => {
  const keyItem = {}
  keyItem[key] = {S: keyValue}

  const fetched = await new DynamoDBClient().send(
    new GetItemCommand(
      {
        TableName: tableName,
        Key: keyItem
      }
    )
  )

  if (!fetched.Item) return {}

  return removeTypeKey(fetched.Item)
}

export const saveRecord = (tableName, attr) => {
  return new DynamoDBClient().send(
    new PutItemCommand({
      TableName: tableName,
      Item: setTypeKey(attr)
    })
  )
}

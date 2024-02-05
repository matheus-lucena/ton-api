import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const marshallOptions = {
  convertEmptyValues: false, // false, by default.
  removeUndefinedValues: false, // false, by default.
  convertClassInstanceToMap: false, // false, by default
};

const unmarshallOptions = {
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

export const getDynamodbClient = (client: DynamoDBClient) => {
  return DynamoDBDocumentClient.from(client, translateConfig);
};

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

function required(name, value) {
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

export function getAwsConfig() {
  const region =
    process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || process.env.AWS_DYNAMODB_REGION;
  const accessKeyId = process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

  required('AWS region (AWS_REGION)', region);
  required('AWS access key (ACCESS_KEY_ID or AWS_ACCESS_KEY_ID)', accessKeyId);
  required('AWS secret key (SECRET_ACCESS_KEY or AWS_SECRET_ACCESS_KEY)', secretAccessKey);

  return {
    region,
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  };
}

export function createDynamoClient() {
  return new DynamoDBClient(getAwsConfig());
}

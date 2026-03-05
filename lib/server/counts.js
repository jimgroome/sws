import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { ContactsApi, ContactsApiApiKeys } from '@getbrevo/brevo';
import { createDynamoClient } from './aws';

export async function getDynamoResponseCount() {
  const tableName = process.env.DYNAMO_DB_PETITION_RESPONSES_TABLE;

  if (!tableName) {
    throw new Error('DYNAMO_DB_PETITION_RESPONSES_TABLE is not configured.');
  }

  const ddbClient = createDynamoClient();

  let total = 0;
  let exclusiveStartKey;

  do {
    const response = await ddbClient.send(
      new ScanCommand({
        TableName: tableName,
        Select: 'COUNT',
        ExclusiveStartKey: exclusiveStartKey
      })
    );

    total += response.Count || 0;
    exclusiveStartKey = response.LastEvaluatedKey;
  } while (exclusiveStartKey);

  return total;
}

export async function getBrevoListCount(listId = 3) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY is not configured.');
  }

  const contactsApi = new ContactsApi();
  contactsApi.setApiKey(ContactsApiApiKeys.apiKey, apiKey);

  try {
    const { body } = await contactsApi.getList(listId);
    if (typeof body.totalSubscribers === 'number') {
      return body.totalSubscribers;
    }
  } catch (error) {
    console.error('Brevo getList failed, falling back to getContactsFromList:', error);
  }

  const { body } = await contactsApi.getContactsFromList(listId, undefined, 1, 0);
  return body.count ?? 0;
}

import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { ContactsApi, ContactsApiApiKeys } from '@getbrevo/brevo';
import { NextResponse } from 'next/server';
import { createDynamoClient } from '../../../lib/server/aws';

function validatePayload(payload) {
  if (!payload || typeof payload !== 'object') return 'Invalid request payload.';

  const { name, email, postcode } = payload;

  if (!name || typeof name !== 'string') return 'Name is required.';
  if (!email || typeof email !== 'string') return 'Email is required.';
  if (!postcode || typeof postcode !== 'string') return 'Postcode is required.';
  if (!email.includes('@')) return 'Please provide a valid email address.';

  return null;
}

async function saveToDynamo({ name, email, postcode, optInUpdates }) {
  const tableName = process.env.DYNAMO_DB_PETITION_RESPONSES_TABLE;

  if (!tableName) {
    throw new Error('DYNAMO_DB_PETITION_RESPONSES_TABLE is not configured.');
  }

  const docClient = DynamoDBDocumentClient.from(createDynamoClient());

  await docClient.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        responseId: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        postcode: postcode.trim().toUpperCase(),
        optInUpdates: Boolean(optInUpdates)
      }
    })
  );
}

async function upsertBrevoContact({ name, email, postcode }) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY is not configured.');
  }

  const contactsApi = new ContactsApi();
  contactsApi.setApiKey(ContactsApiApiKeys.apiKey, apiKey);

  await contactsApi.createContact({
    email: email.trim().toLowerCase(),
    attributes: {
      FIRSTNAME: name.trim(),
      POSTCODE: postcode.trim().toUpperCase()
    },
    listIds: [3],
    updateEnabled: true
  });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const formData = {
      name: payload.name,
      email: payload.email,
      postcode: payload.postcode,
      optInUpdates: payload.optInUpdates
    };

    await saveToDynamo(formData);

    if (formData.optInUpdates) {
      await upsertBrevoContact(formData);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Petition response submission failed:', error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'production'
            ? 'Unable to submit your response at this time.'
            : error?.message || 'Unable to submit your response at this time.'
      },
      { status: 500 }
    );
  }
}

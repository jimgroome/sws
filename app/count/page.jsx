import { getBrevoListCount, getDynamoResponseCount } from '../../lib/server/counts';

export const dynamic = 'force-dynamic';

export default async function CountPage() {
  let dynamoCount = null;
  let brevoCount = null;
  let dynamoError = null;
  let brevoError = null;

  try {
    dynamoCount = await getDynamoResponseCount();
  } catch (error) {
    console.error('Failed to fetch DynamoDB count:', error);
    dynamoError = 'Unable to load DynamoDB response count.';
  }

  try {
    brevoCount = await getBrevoListCount();
  } catch (error) {
    console.error('Failed to fetch Brevo count:', error);
    brevoError = 'Unable to load Brevo list count.';
  }

  return (
    <article className="page-card">
      <h2>Campaign Counts</h2>

      <p>
        DynamoDB responses:{' '}
        <strong>{dynamoError ? dynamoError : Number(dynamoCount).toLocaleString()}</strong>
      </p>

      <p>
        Brevo list 3 contacts:{' '}
        <strong>{brevoError ? brevoError : Number(brevoCount).toLocaleString()}</strong>
      </p>
    </article>
  );
}

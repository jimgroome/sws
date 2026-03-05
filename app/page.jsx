import Link from 'next/link';
import { homeIntro, sections } from '../lib/sections';
import { getDynamoResponseCount } from '../lib/server/counts';
import SignupForm from './components/SignupForm';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let supporterCount = 0;

  try {
    supporterCount = await getDynamoResponseCount();
  } catch (error) {
    console.error('Failed to fetch homepage supporter count:', error);
  }

  return (
    <article className="page-card">
      <h2>{homeIntro.title}</h2>
      <p className="lead">{homeIntro.subtitle}</p>
      <SignupForm supporterCount={supporterCount} />
      <section className="contact-section" aria-labelledby="contact-title">
        <h3 id="contact-title">Get in touch</h3>
        <p>
          You can email us at{' '}
          <a href="mailto:info@supportwealdschooling.co.uk">
            info@supportwealdschooling.co.uk
          </a>
          .
        </p>
      </section>
      <h3>Site Contents</h3>
      <ul className="site-contents-links">
        {sections.map((section) => (
          <li key={section.slug}>
            <Link href={`/${section.slug}`}>{section.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

import { notFound } from 'next/navigation';
import { sections } from '../../lib/sections';

function getSection(slug) {
  return sections.find((section) => section.slug === slug);
}

export function generateStaticParams() {
  return sections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const section = getSection(slug);

  if (!section) {
    return {
      title: 'Page Not Found'
    };
  }

  return {
    title: section.title,
    description: section.lead
  };
}

export default async function SectionPage({ params }) {
  const { slug } = await params;
  const section = getSection(slug);

  if (!section) {
    notFound();
  }

  return (
    <article className="page-card">
      <h2>{section.title}</h2>
      <p className="lead">{section.lead}</p>

      <div className="blocks-grid">
        {section.blocks.map((block) => (
          <section className="content-block" key={block.heading}>
            <h3>{block.heading}</h3>
            <ul>
              {block.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

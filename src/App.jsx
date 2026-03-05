import { Link, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { homeIntro, sections } from './data/sections';

function HomePage() {
  return (
    <article className="page-card">
      <h2>{homeIntro.title}</h2>
      <p className="lead">{homeIntro.subtitle}</p>
      <p>{homeIntro.summary}</p>
      <h3>Site Contents</h3>
      <ul className="site-contents-links">
        {sections.map((section) => (
          <li key={section.slug}>
            <Link to={`/${section.slug}`}>{section.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function SectionPage({ section }) {
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

function NotFoundPage() {
  return (
    <article className="page-card">
      <h2>Page Not Found</h2>
      <p>This section could not be found.</p>
    </article>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {sections.map((section) => (
          <Route
            key={section.slug}
            path={section.slug}
            element={<SectionPage section={section} />}
          />
        ))}
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

import SiteShell from './components/SiteShell';
import './globals.css';

export const metadata = {
  title: {
    default: 'Support Weald Schooling',
    template: '%s | Support Weald Schooling'
  },
  description:
    'Support Weald Schooling campaign for a new inclusive, non-selective secondary school in Cranbrook, Kent.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

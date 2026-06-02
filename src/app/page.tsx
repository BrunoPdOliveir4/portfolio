import { RootRedirect } from './RootRedirect';

// Emits out/index.html so the site root redirects to the default locale
// instead of 404ing on GitHub Pages.
export default function RootPage() {
  return <RootRedirect />;
}

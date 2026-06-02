import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// GitHub Pages serves this project repo under /portfolio/. Apply the basePath
// only for production builds so local dev keeps serving from the root.
const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    domains: ['backend', 'nginx', 'localhost', 'tg.i-c-a.su'],
  },
};

export default withNextIntl(nextConfig);
import React from 'react';

// Stub of next-intl/navigation's createNavigation for tests (the real module
// ships ESM that Jest doesn't transform). Returns inert navigation helpers.
export function createNavigation() {
  const Link = ({ href, children, ...rest }: { href: unknown; children?: React.ReactNode }) =>
    React.createElement('a', { href: String(href), ...rest }, children);

  const usePathname = () => '/';
  const useRouter = () => ({
    push: () => {},
    replace: () => {},
    prefetch: () => {},
    back: () => {},
    forward: () => {},
    refresh: () => {},
  });
  const getPathname = () => '/';
  const redirect = () => {};

  return { Link, usePathname, useRouter, getPathname, redirect };
}

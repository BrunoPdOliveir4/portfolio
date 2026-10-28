import React from 'react';

// Stub of next-intl/navigation's createNavigation for tests (the real module
// ships ESM that Jest doesn't transform). Returns inert navigation helpers.
export function createNavigation() {
  const toHref = (href: unknown): string => {
    if (typeof href === 'string') return href;
    const { pathname = '', hash } = href as { pathname?: string; hash?: string };
    return hash ? `${pathname}#${hash}` : pathname;
  };
  const Link = ({ href, children, ...rest }: { href: unknown; children?: React.ReactNode }) =>
    React.createElement('a', { href: toHref(href), ...rest }, children);

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

// Stub of next-intl/routing's defineRouting for tests; returns the config
// unchanged so `routing.locales` etc. stay available.
export function defineRouting<T>(config: T): T {
  return config;
}

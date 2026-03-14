import React from 'react';
import messages from '@/i18n/messages/en.json';

type Messages = Record<string, any>;

function getNestedValue(obj: Messages, namespace: string): Messages {
  return namespace.split('.').reduce((acc, key) => acc?.[key] ?? {}, obj);
}

export function useTranslations(namespace: string) {
  const section = getNestedValue(messages, namespace);
  return (key: string) => section[key] ?? `${namespace}.${key}`;
}

export function useLocale() {
  return 'en';
}

export function useMessages() {
  return messages;
}

export function useNow() {
  return new Date();
}

export function useTimeZone() {
  return 'UTC';
}

export function useFormatter() {
  return {
    number: (value: number) => String(value),
    dateTime: (value: Date) => value.toISOString(),
    relativeTime: (value: Date) => value.toISOString(),
  };
}

export function NextIntlClientProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

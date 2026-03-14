'use client';

import { useEffect, useState } from 'react';

type Props = {
  code: string;
  language: 'typescript' | 'python';
};

export function CodeBlock({ code, language }: Props) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    async function highlight() {
      const { codeToHtml } = await import('shiki');
      const result = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
      });
      setHtml(result);
    }
    highlight();
  }, [code, language]);

  if (!html) {
    return (
      <div className="bg-zinc-950 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-zinc-400">{code}</pre>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg overflow-x-auto [&>pre]:p-4 [&>pre]:text-sm [&>pre]:!bg-zinc-950"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

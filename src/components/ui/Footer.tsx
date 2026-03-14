import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-border py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-mono">
        <p>{t('builtWith')}</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/BrunoPdOliveir4"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/b-pedroso"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:dev.bpedroso@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

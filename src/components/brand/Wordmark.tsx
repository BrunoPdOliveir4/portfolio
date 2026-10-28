import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  /** Letter-spaced line under the name, e.g. "BACKEND · SECURITY · AI". */
  tagline?: string;
};

/** "BRUNO" in white over "PEDROSO" in mint, set in the display face. */
export function Wordmark({ className, tagline }: Props) {
  return (
    <span className={cn('inline-flex flex-col font-display font-bold uppercase leading-none', className)}>
      <span className="tracking-[0.12em] text-zinc-50">Bruno</span>
      <span className="tracking-[0.12em] text-brand-400 drop-shadow-[0_0_10px_rgba(94,242,166,0.35)]">Pedroso</span>
      {tagline && (
        <span className="mt-[0.6em] font-mono text-[0.32em] font-normal tracking-[0.35em] text-zinc-400">
          {tagline}
        </span>
      )}
    </span>
  );
}

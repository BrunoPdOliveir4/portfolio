import { BrandMark } from '@/components/brand/BrandMark';
import { Wordmark } from '@/components/brand/Wordmark';

/** Navbar brand: the "BP" mark beside a compact two-line wordmark. */
export function Brand() {
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark className="w-10" glow={false} label={null} />
      <Wordmark className="text-[13px]" />
    </span>
  );
}

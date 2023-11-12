import { getImageUrl } from '../helpers';
import type { PosterSize } from '../helpers';

interface PosterProps {
  className?: string;
  alt: string;
  poster?: string | null;
  width: PosterSize;
}
export function Poster({ className, alt, poster, width }: PosterProps): JSX.Element {
  const height = width * 1.5;
  if (poster === undefined || poster === null) {
    return (
      <div
        aria-description={alt}
        className={`${className} flex items-center justify-center bg-slate-600`}
        style={{ height, width }}
      >
        no cover
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      height={height}
      src={getImageUrl('poster', poster, width)}
      style={{ height, width }}
      width={width}
    />
  );
}

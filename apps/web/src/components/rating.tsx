import { useState } from 'react';
import type { MouseEvent } from 'react';
import type { Movie } from 'shared_types';

interface RatingProps {
  rating: Movie['rating'];
  onRate: ((rating: number) => void) | ((rating: number) => Promise<void>);
}
export function Rating({ rating, onRate }: RatingProps): JSX.Element {
  const [rate, setRate] = useState(rating);
  const unactiveClasses = 'text-gray-600';
  const activeClasses = 'text-amber-400';

  function onhoverStar(event: MouseEvent<HTMLButtonElement>): void {
    const target = event.target as HTMLButtonElement;

    let count = 0;
    let sibling = target.previousSibling;
    while (sibling !== null) {
      count++;
      sibling = sibling.previousSibling;
    }
    setRate(count as Movie['rating']);
  }

  function onleaveStar(): void {
    setRate(rating);
  }

  const stars: JSX.Element[] = [];
  for (let index = 1; index <= 5; index++) {
    stars.push(
      <button
        className={rate >= index ? activeClasses : unactiveClasses}
        key={index}
        onClick={() => {
          void onRate(index);
        }}
        onMouseEnter={onhoverStar}
        onMouseLeave={onleaveStar}
        type="button"
      >
        ★
      </button>,
    );
  }

  return (
    <div className="text-2xl">
      <button
        className="w-2 h-4"
        onClick={() => {
          void onRate(0);
        }}
        onMouseEnter={onhoverStar}
        type="button"
      >
        {' '}
      </button>
      {stars}
    </div>
  );
}

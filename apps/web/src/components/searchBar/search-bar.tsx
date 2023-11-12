'use client';
import { Suspense, useState, useDeferredValue, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SearchResults } from './search-results';

export function SearchBar(): JSX.Element {
  const pathName = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setSearch('');
  }, [pathName]);

  useEffect(() => {
    function onClick(event: MouseEvent): void {
      if (event.target === null || resultRef.current === null) {
        return;
      }

      if (!resultRef.current.contains(event.target as Node)) {
        setSearch('');
      }
    }
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [resultRef]);

  return (
    <div className="w-80 relative">
      <input
        className="bg-slate-950 w-full p-1"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search a movie"
        ref={inputRef}
        type="text"
        value={search}
      />
      <Suspense>
        {deferredSearch.length > 0 && <SearchResults query={deferredSearch} ref={resultRef} />}
      </Suspense>
    </div>
  );
}

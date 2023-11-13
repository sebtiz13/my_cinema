'use client';
import { useEffect, useState } from 'react';

type Order = 'asc' | 'desc';

interface SortFilterProps {
  sorts: Record<string, string>;
  onSort?: (sortBy: string, sortOrder: Order) => void;
}

export function SortFilter({ sorts, onSort }: SortFilterProps): JSX.Element {
  const [key, setKey] = useState<string>();
  const [order, setOrder] = useState<Order>('asc');

  useEffect(() => {
    if (key !== undefined && onSort !== undefined) {
      onSort(key, order);
    }
  }, [key, order, onSort]);

  function onClick(sortKey: string): void {
    if (key !== sortKey) {
      setKey(sortKey);
      setOrder('asc');
      return;
    }
    setOrder(order === 'asc' ? 'desc' : 'asc');
  }

  return (
    <div className="flex items-center space-x-4">
      {Object.entries(sorts).map(([sortKey, label]) => (
        <button
          className="bg-teal-800 px-1"
          key={sortKey}
          onClick={() => {
            onClick(sortKey);
          }}
          type="button"
        >
          {label} {key === sortKey ? order : null}
        </button>
      ))}
    </div>
  );
}

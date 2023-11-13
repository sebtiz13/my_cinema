'use client';
interface SavedButtonProps {
  className?: string;
  saved: boolean;
  onClick?: (() => void) | (() => Promise<void>);
}
export function SavedButton({ className, saved, onClick }: SavedButtonProps): JSX.Element {
  const classButton = saved ? 'bg-green-800 hover:bg-gray-600' : 'bg-gray-800 hover:bg-green-600';

  return (
    <button
      className={`${className} ${classButton} transition duration-300 rounded-lg px-2 py-1`}
      onClick={onClick}
      type="button"
    >
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}

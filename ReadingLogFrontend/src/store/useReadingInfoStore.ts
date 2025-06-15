import { create } from 'zustand';
import { persist } from 'zustand/middleware';

localStorage.removeItem( 'reading-book' );

interface ReadingBookState {
  readingBookId: number;
  setReadingBookId: (id: number) => void;
  endReadingBook: () => void;
}

export const useReadingBookStore = create<ReadingBookState>()(
  persist<ReadingBookState>(
    (set) => ({
      readingBookId: 0,
      setReadingBookId: (id) => set( { readingBookId: id } ),
      endReadingBook: () => {
        set( { readingBookId: 0 } );
        localStorage.removeItem( 'reading-book' );
      },
    }),
    {
      name: 'reading-book',
      skipHydration: true,
      onRehydrateStorage: () => () => {
        // 무조건 로컬스토리지 제거
        localStorage.removeItem( 'reading-book' );
      },
    }
  )
);

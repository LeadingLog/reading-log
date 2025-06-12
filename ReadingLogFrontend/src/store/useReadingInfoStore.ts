import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReadingBookState {
  readingBookId: number;
  setReadingBookId: (id: number) => void;
  endReadingBook: () => void; // 이름 변경 및 로컬스토리지 삭제
}

export const useReadingBookStore = create<ReadingBookState>()(
  persist(
    (set) => ({
      readingBookId: 0,
      setReadingBookId: (id) => set({ readingBookId: id }),
      endReadingBook: () => {
        set({ readingBookId: 0 });
        localStorage.removeItem('reading-book');
      },
    }),
    {
      name: 'reading-book',
      /* 새고고침 하거나 홈에 접속했을 때 bookId값이 로컬에 남아있으면 지운다 */
      onRehydrateStorage: () => (state) => {
        if (state?.readingBookId !== 0) {
          localStorage.removeItem('reading-book');
        }
      },
    }
  )
);
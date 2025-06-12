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
        set({ readingBookId: 0 }); // 상태도 초기화
        localStorage.removeItem('reading-book'); // ✅ 스토리지에서 삭제
      },
    }),
    {
      name: 'reading-book', // ✅ localStorage 키 이름
    }
  )
);
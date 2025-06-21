import { useEffect } from 'react';
import { useReadingBookStore } from "../../store/useReadingInfoStore.ts";
/* 독서 중 새로고침 방지 */
export function WarningScreen() {

  const { readingBookId } = useReadingBookStore();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!readingBookId) return;

      e.preventDefault();
      e.returnValue = ''; // 대부분의 브라우저에서 경고 메시지 대신 기본 경고창 표시
    };

    if (readingBookId) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

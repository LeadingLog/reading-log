/* db 값이 변경된 경우 리스트 값을 리렌더링 하기 위한 요소 */
import { create } from 'zustand';

type ChangeKey = 'INTERESTED' | 'MyReadingList' | 'TimeSave' ; // 원하는 키를 나열

type GlobalChangeStore = {
  triggers: Record<ChangeKey, number>;
  triggerChange: (key: ChangeKey) => void;
};

export const useGlobalChangeStore = create<GlobalChangeStore>((set) => ({
  triggers: {
    INTERESTED: 0, // 관심도서 추가 및 삭제 시 카운트
    MyReadingList: 0, // 내 독서 목록 리스트 변경 시 카운트
    TimeSave: 0 // 시간 저장 시 카운트
  },
  triggerChange: (key) =>
    set((state) => ({
      triggers: {
        ...state.triggers,
        [key]: state.triggers[key] + 1,
      },
    })),
}));


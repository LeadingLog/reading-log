import IconTriangle from "../../assets/Icon-triangle.svg?react";
import YearSlideBar from "../common/YearSlideBar.tsx";
import { usePageStore } from "../../store/pageStore.ts";
import { useModalStore } from "../../store/modalStore.ts"; // Zustand 스토어 import

export default function TimeLine() {
  const {setRightContent} = usePageStore(); // Zustand에서 상태 업데이트 함수 가져오기
  const {openModal} = useModalStore();
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  // GET - 쿼리 파라미터 테스트
  const handleQueryTestClick = async () => {
    try {
      const response = await fetch(`${serverUrl}/test/query?name=은지&age=25`);
      const data = await response.json();
      console.log('쿼리 응답:', data);
    } catch (error) {
      console.error('쿼리 테스트 에러:', error);
    }
  };

  // POST - 바디 테스트
  const handleBodyTestClick = async () => {
    try {
      const response = await fetch(`${serverUrl}/test/body`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hobby: '헬스',
          level: '중급',
        }),
      });
      const data = await response.json();
      console.log('바디 응답:', data);
    } catch (error) {
      console.error('바디 테스트 에러:', error);
    }
  };

  return (
    <section className="flex flex-col gap-4 rounded-xl">
      {/* 총 독서 시간 표시 */}
      <article
        className="flex justify-center items-center text-allReadingTime_Text text-2xl bg-allReadingTime_Bg rounded-xl p-3.5">
        총 독서 시간 : <span>00:00:00</span>
      </article>

      {/* 작년 이번년 내년 선택 슬라이드 */}
      <YearSlideBar/>

      {/* 연별 통계 보러가는 버튼 */}
      <button
        className="flex gap-2 justify-end items-center group"
        onClick={() =>
          setRightContent(
            'StatsPage',
            {StatsPage: {tab: 'StatsYear'}}, // 파라미터
            {title: '나의 리딩로그 - 연별통계'}        // pageData (타이틀)
          )
        }
      >
        <span>2025</span>
        년 리딩로그 보러가기
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>

      {/* 월별 통계 버튼 */}
      <button
        className="flex gap-2 justify-end items-center group"
        onClick={() =>
          setRightContent(
            'StatsPage',
            {StatsPage: {tab: 'StatsMonth'}}, // 파라미터
            {title: '나의 리딩로그 - 월별통계'}        // pageData (타이틀)
          )
        }
      >
        월별 통계 화면 보기 (임시 버튼)
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>
      {/* 월별 통계 버튼 */}
      <button
        className="flex gap-2 justify-end items-center group"
        onClick={() =>
          setRightContent(
            'TimeTracking', {},
            {title: '이번 달 독서 리스트'},
          )
        }
      >
        이번 달 독서 리스트 보기 (임시 버튼)
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>
      <button
        className="flex gap-2 justify-end items-center group"
        onClick={() =>
          setRightContent(
            'TimeTracking',
            {TimeTracking: {tab: 'StopWatch'}}, // 파라미터
            {title: '독서 타임 트래킹 - 스탑워치'}     // pageData (타이틀)
          )
        }
      >
        독서 타임 트랙킹 스탑워치 (임시 버튼)
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>
      <button
        className="flex gap-2 justify-end items-center group"
        onClick={() =>
          setRightContent(
            'TimeTracking',
            {TimeTracking: {tab: 'Timer'}}, // 파라미터
            {title: '독서 타임 트래킹 - 타이머'}     // pageData (타이틀)
          )
        }
      >
        독서 타임 트랙킹 타이머 (임시 버튼)
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>
      <button
        className="flex gap-2 justify-end items-center group"
        onClick={() =>
          openModal('ModalTrackingPlan', {
          })
        }
      >
        독서 타임 트랙킹 모달 (임시 버튼)
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>
      <button
        className="flex gap-2 justify-end items-center group"
        onClick={() =>
          openModal('ModalBookPlan', {
          })
        }
      >
        독서 계획 모달 (임시 버튼)
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>

      <button
        className="flex gap-2 justify-end items-center group"
        onClick={handleQueryTestClick}
      >
        msw 쿼리 테스트 (임시 버튼)
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>

      <button
        className="flex gap-2 justify-end items-center group"
        onClick={handleBodyTestClick}
      >
        msw 바디 테스트 (임시 버튼)
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>

      {/* 이번 년도 타임라인 표시 */}
      <article>
        <div></div>
        <div></div>
        <div></div>
      </article>
    </section>
  );
}

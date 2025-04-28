import IconTriangle from "../../assets/Icon-triangle.svg?react";
import YearSlideBar from "../common/YearSlideBar.tsx";
import { usePageStore } from "../../store/pageStore.ts";
// import { useModalStore } from "../../store/modalStore.ts"; // Zustand 스토어 import

export default function TimeLine() {
  const { setRightContent } = usePageStore(); // Zustand에서 상태 업데이트 함수 가져오기
  // const { openModal } = useModalStore();
  return (
    <section className="flex flex-col gap-4 rounded-xl flex-1">
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
            { StatsPage: { tab: 'StatsYear' } }, // 파라미터
            { title: '나의 리딩로그 - 연별통계' }        // pageData (타이틀)
          )
        }
      >
        <span>2025</span>
        년 리딩로그 보러가기
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>

      {/*/!* 월별 통계 버튼 *!/*/}
      {/*<button*/}
      {/*  className="flex gap-2 justify-end items-center group"*/}
      {/*  onClick={() =>*/}
      {/*    setRightContent(*/}
      {/*      'StatsPage',*/}
      {/*      {StatsPage: {tab: 'StatsMonth'}}, // 파라미터*/}
      {/*      {title: '나의 리딩로그 - 월별통계'}        // pageData (타이틀)*/}
      {/*    )*/}
      {/*  }*/}
      {/*>*/}
      {/*  월별 통계 화면 보기 (임시 버튼)*/}
      {/*  <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">*/}
      {/*    <IconTriangle/>*/}
      {/*  </span>*/}
      {/*</button>*/}
      {/*/!* 월별 통계 버튼 *!/*/}
      {/*<button*/}
      {/*  className="flex gap-2 justify-end items-center group"*/}
      {/*  onClick={() =>*/}
      {/*    setRightContent(*/}
      {/*      'TimeTracking', {},*/}
      {/*      {title: '이번 달 독서 리스트'},*/}
      {/*    )*/}
      {/*  }*/}
      {/*>*/}
      {/*  이번 달 독서 리스트 보기 (임시 버튼)*/}
      {/*  <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">*/}
      {/*    <IconTriangle/>*/}
      {/*  </span>*/}
      {/*</button>*/}
      {/*<button*/}
      {/*  className="flex gap-2 justify-end items-center group"*/}
      {/*  onClick={() =>*/}
      {/*    setRightContent(*/}
      {/*      'TimeTracking',*/}
      {/*      {TimeTracking: {tab: 'StopWatch'}}, // 파라미터*/}
      {/*      {title: '독서 타임 트래킹 - 스탑워치'}     // pageData (타이틀)*/}
      {/*    )*/}
      {/*  }*/}
      {/*>*/}
      {/*  독서 타임 트랙킹 스탑워치 (임시 버튼)*/}
      {/*  <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">*/}
      {/*    <IconTriangle/>*/}
      {/*  </span>*/}
      {/*</button>*/}
      {/*<button*/}
      {/*  className="flex gap-2 justify-end items-center group"*/}
      {/*  onClick={() =>*/}
      {/*    setRightContent(*/}
      {/*      'TimeTracking',*/}
      {/*      {TimeTracking: {tab: 'Timer'}}, // 파라미터*/}
      {/*      {title: '독서 타임 트래킹 - 타이머'}     // pageData (타이틀)*/}
      {/*    )*/}
      {/*  }*/}
      {/*>*/}
      {/*  독서 타임 트랙킹 타이머 (임시 버튼)*/}
      {/*  <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">*/}
      {/*    <IconTriangle/>*/}
      {/*  </span>*/}
      {/*</button>*/}
      {/*<button*/}
      {/*  className="flex gap-2 justify-end items-center group"*/}
      {/*  onClick={() =>*/}
      {/*    openModal('ModalTrackingPlan', {*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*  독서 타임 트랙킹 모달 (임시 버튼)*/}
      {/*  <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">*/}
      {/*    <IconTriangle/>*/}
      {/*  </span>*/}
      {/*</button>*/}
      {/*<button*/}
      {/*  className="flex gap-2 justify-end items-center group"*/}
      {/*  onClick={() =>*/}
      {/*    openModal('ModalBookPlan', {*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*  독서 계획 모달 (임시 버튼)*/}
      {/*  <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">*/}
      {/*    <IconTriangle/>*/}
      {/*  </span>*/}
      {/*</button>*/}

      {/* 이번 년도 타임라인 표시 */}
      <article className="flex flex-1 py-4">
        <div className="relative flex w-[25%]">
          <div className="absolute top-[calc(33.3333%-10px)] bottom-[calc(33.3333%-10px)] border-r-0 rounded-l-full border-[10px] border-timeLineBorder w-full"></div>
        </div>
        <div className="relative flex flex-col justify-between w-[50%]">
          <div className="absolute top-0 h-2.5 w-full bg-timeLineBorder rounded-l-full"></div>
          <div className="absolute bottom-2/3 h-2.5 w-full bg-timeLineBorder"></div>
          <div className="absolute top-2/3 h-2.5 w-full bg-timeLineBorder"></div>
          <div className="absolute bottom-0 h-2.5 w-full bg-timeLineBorder rounded-l-full"></div>
          {/*<div className="absolute top-0 bottom-2/3 w-full border-t-8 border-b-8 border-timeLineBorder"></div>*/}
          {/*<div className="absolute top-2/3 bottom-0 w-full border-t-8 border-b-8 border-timeLineBorder"></div>*/}
        </div>
        <div className="relative flex w-[25%]">
          <div className="absolute top-0 bottom-2/3 border-l-0 border-timeLineBorder rounded-r-full border-[10px] w-full"></div>
          <div className="absolute top-2/3 bottom-0 border-l-0 border-timeLineBorder rounded-r-full border-[10px] w-full"></div>
        </div>
      </article>
    </section>
  );
}

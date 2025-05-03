import IconTriangle from "../../assets/Icon-triangle.svg?react";
import YearSlideBar from "../common/YearSlideBar.tsx";
import { usePageStore } from "../../store/pageStore.ts";
// import { useModalStore } from "../../store/modalStore.ts"; // Zustand 스토어 import

export default function TimeLine() {

  const { setRightContent } = usePageStore(); // Zustand에서 상태 업데이트 함수 가져오기

  const statsMonth = (month:string) => {
    setRightContent(
      'StatsPage',
      {StatsPage: {tab: 'StatsMonth'}}, // 파라미터
      {title: `나의 리딩로그 - 월별통계 - ${month}월`}        // pageData (타이틀)
    )
  }

  // GET - 쿼리 파라미터 테스트
  // const handleQueryTestClick = async () => {
  //   try {
  //     const response = await fetch(`${serverUrl}/test/query?name=은지&age=25`);
  //     const data = await response.json();
  //     console.log('쿼리 응답:', data);
  //   } catch (error) {
  //     console.error('쿼리 테스트 에러:', error);
  //   }
  // };

  // POST - 바디 테스트
  // const handleBodyTestClick = async () => {
  //   try {
  //     const response = await fetch(`${serverUrl}/test/body`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         hobby: '헬스',
  //         level: '중급',
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log('바디 응답:', data);
  //   } catch (error) {
  //     console.error('바디 테스트 에러:', error);
  //   }
  // };


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
        <span>2025</span>년 리딩로그 보러가기
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>

      {/*월별 통계 버튼*/}
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
        이번 달 독서 리스트 보기
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>
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

      {/*<button*/}
      {/*  className="flex gap-2 justify-end items-center group"*/}
      {/*  onClick={handleQueryTestClick}*/}
      {/*>*/}
      {/*  msw 쿼리 테스트 (임시 버튼)*/}
      {/*  <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">*/}
      {/*    <IconTriangle/>*/}
      {/*  </span>*/}
      {/*</button>*/}

      {/*<button*/}
      {/*  className="flex gap-2 justify-end items-center group"*/}
      {/*  onClick={handleBodyTestClick}*/}
      {/*>*/}
      {/*  msw 바디 테스트 (임시 버튼)*/}
      {/*  <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">*/}
      {/*    <IconTriangle/>*/}
      {/*  </span>*/}
      {/*</button>*/}

      {/* 이번 년도 타임라인 표시 */}
      <article className="flex flex-1 p-2 text-timeLineMonthText text-sm">
        <div className="relative flex w-[25%]">
          <div
            className="absolute top-[calc(33.3333%-10px)] bottom-[calc(33.3333%-10px)] border-r-0 rounded-l-full border-[10px] border-timeLineBorder w-full">
            {/* 7월 */}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 -left-1.5 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('7')}
            >
              7
            </div>
          </div>
        </div>
        <div className="relative flex flex-col justify-between w-[50%]">
          <div className="absolute top-0 h-2.5 w-full right-0 bg-timeLineBorder rounded-l-full">
            {/* 1월 */}
            <div
              className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[25%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('1')}
            >
              1
              <div className="group-hover:top-[120%] absolute flex gap-1 top-[110%]">
                <span className=" group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">
                  <p className="group-hover:opacity-100 opacity-0 text-xs">5</p>
                </span>
                <span className=" group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">
                  <p className="group-hover:opacity-100 opacity-0 text-xs">5</p>
                </span>
                <span className=" group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">
                  <p className="group-hover:opacity-100 opacity-0 text-xs">5</p>
                </span>
              </div>
            </div>
            {/* 2월 */}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[75%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('2')}
            >
              2
            </div>
          </div>
          <div className="absolute bottom-2/3 h-2.5 w-full bg-timeLineBorder">
            {/* 4월*/}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('4')}
            >
              4
            </div>
            {/* 5월 */}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('5')}
            >
              5
            </div>
            {/* 6월 */}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('6')}
            >
              6
            </div>
          </div>
          <div className="absolute top-2/3 h-2.5 w-full bg-timeLineBorder">
            {/* 8월*/}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[25%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('8')}
            >
              8
            </div>
            {/* 9월 */}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[75%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('9')}
            >
              9
            </div>
          </div>
          <div className="absolute bottom-0 h-2.5 w-full bg-timeLineBorder rounded-l-full">
            {/* 11월*/}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('11')}
            >
              11
            </div>
            {/* 12월 */}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('12')}
            >
              12
            </div>
          </div>
        </div>
        <div className="relative flex w-[25%]">
          <div
            className="absolute top-0 bottom-2/3 border-l-0 border-timeLineBorder rounded-r-full border-[10px] w-full">
            {/* 3월 */}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[103%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('3')}
            >
              3
            </div>
          </div>
          <div
            className="absolute top-2/3 bottom-0 border-l-0 border-timeLineBorder rounded-r-full border-[10px] w-full">
            {/* 10월 */}
            <div
              className="hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle
              cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[103%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"
              onClick={() => statsMonth('10')}
            >
              10
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

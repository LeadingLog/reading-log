import IconTriangle from "../../assets/Icon-triangle.svg?react";
import YearSlideBar from "../common/YearSlideBar.tsx";
import { usePageStore } from "../../store/pageStore.ts";
import { useDateStore } from "../../store/useDateStore.ts";
import { useEffect, useState } from "react";
import { fetchTimeLineReadingList } from "../../api/timeLineReadingListApi.ts";
import {
  fetchAllReadingTimeParams,
  fetchTimeLineReadingListParams,
  ResponseBody,
  TimelineEntry
} from "../../types/timeLine.ts";
import { fetchAllReadingTime } from "../../api/allReadingTimeApi.ts";
import { useUserStore } from "../../store/userStore.ts";
import { useGlobalChangeStore } from "../../store/useGlobalChangeStore.ts";
import { useReadingBookStore } from "../../store/useReadingInfoStore.ts";
import { useModalStore } from "../../store/modalStore.ts";

export default function TimeLine() {

  const { triggers } = useGlobalChangeStore.getState();

  const { setRightContent } = usePageStore(); // Zustand에서 상태 업데이트 함수 가져오기
  const { year, setMonth } = useDateStore(); // Zustand에서 년도 정보 가져오기
  const { userId } = useUserStore()
  const { readingBookId } = useReadingBookStore()
  const { openModal } = useModalStore()

  const nowData = new Date()
  const nowYear = nowData.getFullYear()
  const nowMonth = nowData.getMonth() + 1

  const thisMonthReadingList = () => {
    if (readingBookId > 0) {
      openModal( "ModalNotice", {
        title: "독서중인 도서가 있습니다",
        subTitle: "독서종료 후 확인 가능합니다",
        onlyClose: true
      } )
      return
    }
    setRightContent(
      'TimeTracking',
      {
        TimeTracking:
          { tab: "onlyMonthReadingList" }
      },
      { title: '이번 달 독서 리스트' },
    )
  }

  const statsMonth = (month: number) => {
    if (readingBookId > 0) {
      openModal( "ModalNotice", {
        title: "독서중인 도서가 있습니다",
        subTitle: "독서종료 후 확인 가능합니다",
        onlyClose: true
      } )
      return
    }
    setRightContent(
      'StatsPage',
      { StatsPage: { tab: 'StatsMonth' } }, // 파라미터
      { title: `나의 리딩로그 - 월별통계` }
    )
    setMonth( month )
  }

  const statsYear = () => {
    if (readingBookId > 0) {
      openModal( "ModalNotice", {
        title: "독서중인 도서가 있습니다",
        subTitle: "독서종료 후 확인 가능합니다",
        onlyClose: true
      } )
      return
    }
    setRightContent(
      'StatsPage',
      { StatsPage: { tab: 'StatsYear' } }, // 파라미터
      { title: '나의 리딩로그 - 연별통계' }        // pageData (타이틀)
    )
  }

  /* 월 표시 위치 및 년도 변경 시 도서권수 초기화용 */
  const getInitialMonthArr = (): TimelineEntry[] => [
    {
      name: '1월',
      month: 1,
      col: 3,
      row: 1,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: 'unset',
      left: '50%',
      right: 'unset',
      bottom: 'calc(100% - 21px)',
      transform: '-translate-x-1/2'
    },
    {
      name: '2월',
      month: 2,
      col: 5,
      row: 1,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: 'unset',
      left: '50%',
      right: 'unset',
      bottom: 'calc(100% - 21px)',
      transform: '-translate-x-1/2'
    },
    {
      name: '3월',
      month: 3,
      col: 7,
      row: 2,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: '50%',
      left: 'unset',
      right: '-10px',
      bottom: 'unset',
      transform: '-translate-y-1/2'
    },
    {
      name: '4월',
      month: 4,
      col: 6,
      row: 3,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: 'unset',
      left: '50%',
      right: 'unset',
      bottom: '-21px',
      transform: '-translate-x-1/2'
    },
    {
      name: '5월',
      month: 5,
      col: 4,
      row: 3,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: 'unset',
      left: '50%',
      right: 'unset',
      bottom: '-21px',
      transform: '-translate-x-1/2'
    },
    {
      name: '6월',
      month: 6,
      col: 2,
      row: 3,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: 'unset',
      left: '50%',
      right: 'unset',
      bottom: '-21px',
      transform: '-translate-x-1/2'
    },
    {
      name: '7월',
      month: 7,
      col: 1,
      row: 5,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: '50%',
      left: '-10px',
      right: 'unset',
      bottom: 'unset',
      transform: '-translate-y-1/2'
    },
    {
      name: '8월',
      month: 8,
      col: 3,
      row: 6,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: 'unset',
      left: '50%',
      right: 'unset',
      bottom: '-21px',
      transform: '-translate-x-1/2'
    },
    {
      name: '9월',
      month: 9,
      col: 5,
      row: 6,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: 'unset',
      left: '50%',
      right: 'unset',
      bottom: '-21px',
      transform: '-translate-x-1/2'
    },
    {
      name: '10월',
      month: 10,
      col: 7,
      row: 8,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: '50%',
      left: 'unset',
      right: '-10px',
      bottom: 'unset',
      transform: '-translate-y-1/2'
    },
    {
      name: '11월',
      month: 11,
      col: 6,
      row: 10,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: 'unset',
      left: '50%',
      right: 'unset',
      bottom: '-21px',
      transform: '-translate-x-1/2'
    },
    {
      name: '12월',
      month: 12,
      col: 4,
      row: 10,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: 'unset',
      left: '50%',
      right: 'unset',
      bottom: '-21px',
      transform: '-translate-x-1/2'
    }
  ];

  const [monthArr, setMonthArr] = useState<TimelineEntry[]>( getInitialMonthArr );

  /* 년도 변경 시 도서 권 수 변경 */
  const searchTimeLineReadingList = async ({ userId, year }: fetchTimeLineReadingListParams) => {
    try {
      const response = await fetchTimeLineReadingList( { userId, year } );

      const readingCountByMonth = response.readingCountByMonth;
      const freshArr = getInitialMonthArr();
      const updated: TimelineEntry[] = freshArr.map( (month) => {
        const found = readingCountByMonth.find(
          (item: ResponseBody) => item.month === month.month
        );
        return found
          ? {
            ...month,
            notStarted: found.notStarted,
            inProgress: found.inProgress,
            completed: found.completed,
          }
          : month;
      } );

      setMonthArr( updated );
    } catch (error) {
      console.error( "타임라인에 보여 질 년&월 도서 수 가져오기 실패:", error );
    }
  };

  /* 총 독서 시간 가져오기 */
  const [allReadingTimeHour, setAllReadingTimeHour] = useState( 0 )
  const [allReadingTimeMin, setAllReadingTimeMin] = useState( 0 )
  const [allReadingTimeSec, setAllReadingTimeSec] = useState( 0 )

  const readingTime = async (userId: fetchAllReadingTimeParams) => {
    try {
      const response = await fetchAllReadingTime( userId )

      const totalSeconds = response.data;

      const hour = Math.floor( totalSeconds / 3600 );
      const min = Math.floor( (totalSeconds % 3600) / 60 );
      const sec = Math.floor( totalSeconds % 60 );

      setAllReadingTimeHour( hour )
      setAllReadingTimeMin( min )
      setAllReadingTimeSec( sec )

    } catch (error) {
      setAllReadingTimeHour( 99 )
      setAllReadingTimeMin( 99 )
      setAllReadingTimeSec( 99 )
      console.error( "독서 시간을 가져오지 못함", error )
    }

  }

  useEffect( () => {
    readingTime( { userId } )
  }, [triggers.TimeSave] );

  useEffect( () => {
    searchTimeLineReadingList( { userId, year } );
  }, [year, triggers.MyReadingList] );

  return (
    <section className="flex flex-col gap-4 rounded-xl flex-1">
      {/* 총 독서 시간 표시 */}
      <article
        className="flex gap-2 justify-center items-center text-allReadingTime_Text text-2xl bg-allReadingTime_Bg rounded-xl p-3.5">
        총 독서 시간
        <span>{String( allReadingTimeHour ).padStart( 2, '0' )}:{String( allReadingTimeMin ).padStart( 2, '0' )}:{String( allReadingTimeSec ).padStart( 2, '0' )}</span>
      </article>

      {/* 작년 이번년 내년 선택 슬라이드 */}
      <YearSlideBar/>
      <article className="flex justify-between">
        <article className="flex flex-col">
          <div className="flex items-center gap-1 text-sm"><span
            className="w-3 h-3 bg-timeLineNoReadBg rounded-full"></span>- 읽기전
          </div>
          <div className="flex items-center gap-1 text-sm"><span
            className="w-3 h-3 bg-timeLineReadingBg rounded-full"></span>- 독서중
          </div>
          <div className="flex items-center gap-1 text-sm"><span
            className="w-3 h-3 bg-timeLineCompleteBg rounded-full"></span>- 완독
          </div>
        </article>
        <article className="flex flex-col gap-1 justify-center ">
          {/* 연별 통계 보러가는 버튼 */}
          <button
            className="flex gap-2 justify-end items-center group"
            onClick={() => statsYear()}
          >
            <span className="group-hover:underline underline-offset-4 decoration-2 decoration-timeLine_StatsYear_Btn_Hover_UnderLine"><span>{year}</span> 년 리딩로그 보러가기</span>
            <span
              className="group-active:translate-x-[10%] duration-100 text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
            <IconTriangle/>
          </span>
          </button>

          <button
            className="flex gap-2 justify-end items-center group"
            onClick={() => thisMonthReadingList()}
          >
            <span className="group-hover:underline underline-offset-4 decoration-2 decoration-timeLine_ThisMonth_Btn_Hover_UnderLine">이번 달 독서 리스트 보기</span>
            <span className="group-active:translate-x-[10%] text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
            <IconTriangle/>
          </span>
          </button>
        </article>
      </article>


      {/* 이번 년도 타임라인 표시 */}
      <article className="relative flex flex-1 m-2 text-timeLineMonthText text-sm">
        {/* 라인 */}
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-9 w-full">
          {/* 첫 줄 라인 */}
          <div
            className="relative
            before:absolute before:top-0 before:right-0 before:w-[130%] before:h-3 before:bg-timeLineBorder before:rounded-l-full"
            style={{ gridColumnStart: '3', gridRowStart: '1' }}
          >
          </div>
          {/* 오른쪽 첫번째 둥근 라인 */}
          <div
            className="relative
            before:absolute before:top-0 before:bottom-[-12px] before:left-0 before:right-0 before:border-[12px] before:border-l-0 before:border-timeLineBorder before:rounded-r-full"
            style={{ gridColumnStart: '4', gridColumnEnd: '8', gridRowStart: '1', gridRowEnd: '4' }}
          ></div>
          {/* 왼쪽 둥근 라인 */}
          <div
            className="relative
            before:absolute before:top-0 before:bottom-[-12px] before:left-0 before:right-0 before:border-[12px] before:border-r-0 before:border-timeLineBorder before:rounded-l-full"
            style={{ gridColumnStart: '1', gridColumnEnd: '4', gridRowStart: '4', gridRowEnd: '7' }}
          >
          </div>
          {/* 오른쪽 두번째 둥근 라인 */}
          <div
            className="relative
            before:absolute before:top-0 before:bottom-[-12px] before:left-0 before:right-0 before:border-[12px] before:border-l-0 before:border-timeLineBorder before:rounded-r-full"
            style={{ gridColumnStart: '4', gridColumnEnd: '8', gridRowStart: '7', gridRowEnd: '10' }}
          ></div>
          {/* 마지막 줄 라인 */}
          <div
            className="relative
            before:absolute before:top-full before:right-0 before:w-[30%] before:h-3 before:bg-timeLineBorder before:rounded-l-full"
            style={{ gridColumnStart: '3', gridRowStart: '9' }}
          >
          </div>
        </div>
        {/* 월 표시 버튼 */}
        <ul className="grid grid-cols-7 grid-rows-9 w-full">
          {monthArr.map( (item) => (
            <li
              key={item.month}
              className={`relative`}
              style={{ gridColumnStart: `${item.col}`, gridRowStart: `${item.row}` }}
            >
              <button
                onClick={() => statsMonth( item.month )}
                style={{
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  bottom: item.bottom,
                }}
                className={`${item.transform} hover:scale-[1.3] hover:border-[4.5px]
                  group absolute rounded-full bg-timeLineMonthCircle border-timeLineMonthHoverCircle transition-all w-8 h-8 duration-100 ease-linear
                  ${item.month === nowMonth && year === nowYear ? 'scale-[1.3] border-[4.5px]' : ''}
                  `}
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{item.month}</span>
                <div
                  className={`absolute flex gap-1 transition-all duration-200 ease-in-out p-2
                    ${item.month === 3 || item.month === 10 ? 'flex-col right-full top-1/2 -translate-y-1/2' :
                    item.month === 7 ? 'flex-col top-1/2 -translate-y-1/2 left-full' :
                      item.month === 11 || item.month === 12 ? 'bottom-full left-1/2 -translate-x-1/2' : 'left-1/2 -translate-x-1/2 pt-5'}
                  `}
                >
                  {item.notStarted > 0 && (
                    <span
                      className={`group-hover:text-timeLineNoReadText
                      ${item.month === nowMonth && year === nowYear ? "" : "text-transparent"}
                      flex w-4 text-xs justify-center items-center aspect-square bg-timeLineNoReadBg rounded-full`}
                    >
                      {item.notStarted}
                    </span>
                  )}
                  {item.inProgress > 0 && (
                    <span
                      className={`group-hover:text-timeLineReadingText
                      ${item.month === nowMonth && year === nowYear ? "" : "text-transparent"}
                      flex w-4 text-xs justify-center items-center aspect-square bg-timeLineReadingBg rounded-full`}
                    >
                      {item.inProgress}
                    </span>
                  )}
                  {item.completed > 0 && (
                    <span
                      className={`group-hover:text-timeLineCompleteText 
                      ${item.month === nowMonth && year === nowYear ? "" : "text-transparent"}
                      flex w-4 text-xs justify-center items-center aspect-square bg-timeLineCompleteBg rounded-full`}
                    >
                      {item.completed}
                    </span>
                  )}
                </div>
              </button>
            </li>
          ) )}
        </ul>
      </article>
    </section>
  );
}

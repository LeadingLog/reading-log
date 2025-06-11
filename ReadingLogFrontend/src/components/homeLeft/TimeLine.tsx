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

export default function TimeLine() {

  const myReadingListTrigger = useGlobalChangeStore((state) => state.triggers.MyReadingList);

  const { setRightContent } = usePageStore(); // Zustand에서 상태 업데이트 함수 가져오기
  const { year, setMonth } = useDateStore(); // Zustand에서 년도 정보 가져오기
  const { userId } = useUserStore()

  const nowData = new Date()
  const nowYear = nowData.getFullYear()
  const nowMonth = nowData.getMonth() + 1

  const thisMonthReadingList = () => {
    setRightContent(
      'TimeTracking', {},
      { title: '이번 달 독서 리스트' },
    )
  }

  const statsMonth = (month: number) => {
    setRightContent(
      'StatsPage',
      { StatsPage: { tab: 'StatsMonth' } }, // 파라미터
      { title: `나의 리딩로그 - 월별통계` }
    )
    setMonth( month )
  }

  const statsYear = () => {
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
      top: '-11px',
      left: '50%',
      right: 'unset',
      bottom: '11px',
      transform: 'translateX(-50%)'
    },
    {
      name: '2월',
      month: 2,
      col: 5,
      row: 1,
      notStarted: 0,
      inProgress: 0,
      completed: 0,
      top: '-11px',
      left: '50%',
      right: 'unset',
      bottom: 'unset',
      transform: 'translateX(-50%)'
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
      transform: 'translateY(-50%)'
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
      transform: 'translateX(-50%)'
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
      transform: 'translateX(-50%)'
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
      transform: 'translateX(-50%)'
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
      transform: 'translateY(-50%)'
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
      transform: 'translateX(-50%)'
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
      transform: 'translateX(-50%)'
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
      transform: 'translateY(-50%)'
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
      transform: 'translateX(-50%)'
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
      transform: 'translateX(-50%)'
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
  }, [] );

  useEffect( () => {
    searchTimeLineReadingList( { userId, year } );
  }, [year, myReadingListTrigger] );

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
            <span><span>{year}</span> 년 리딩로그 보러가기</span>
            <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
            <IconTriangle/>
          </span>
          </button>

          <button
            className="flex gap-2 justify-end items-center group"
            onClick={() => thisMonthReadingList()}
          >
            이번 달 독서 리스트 보기
            <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
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
                  transform: item.transform
                }}
                className={`
                hover:before:-inset-1.5 hover:before:opacity-100 hover:border-timeLineMonthHoverCircle
                  ${item.month === nowMonth && year === nowYear ? 'before:-inset-0.5 before:opacity-100' : 'before:inset-1 before:opacity-0'}
                  before:absolute before:border-timeLineMonthHoverCircle before:border-[6px] before:rounded-[inherit] before:transition-all before:duration-200 before:ease-in-out
                  group absolute w-8 h-8 rounded-full bg-timeLineMonthCircle transition-all duration-200 ease-in-out
                  `}
              >
                <span className="">{item.month}</span>
                <div
                  className={`absolute flex gap-1 transition-all duration-200 ease-in-out left-1/2 transform -translate-x-1/2
                    ${item.month === 3 || item.month === 10 ? 'flex-col top-[50%] -translate-y-1/2 left-[0%] py-2 pr-8 pl-2 group-hover:top-[50%] group-hover:pr-12' :
                    item.month === 7 ? 'flex-col top-[50%] -translate-y-1/2 left-[100%] py-2 pr-2 pl-8 group-hover:top-[50%] group-hover:pl-12' :
                    item.month === 11 || item.month === 12 ? 'bottom-[100%] p-1 group-hover:p-2' : 'p-2 group-hover:pt-4'}
                  `}
                >
                  {item.notStarted > 0 && (
                    <span
                      className="group-hover:w-5 flex justify-center items-center aspect-square bg-timeLineNoReadBg rounded-full"
                    >
                      <p className={`${item.month === nowMonth && year === nowYear ? "opacity-100 w-5" : "w-4"} group-hover:opacity-100 opacity-0 text-xs`}>{item.notStarted}</p>
                    </span>
                  )}
                  {item.inProgress > 0 && (
                    <span
                      className="group-hover:w-5 flex justify-center items-center aspect-square bg-timeLineReadingBg rounded-full"
                    >
                      <p className={`${item.month === nowMonth && year === nowYear ? "opacity-100 w-5" : "w-4"} group-hover:opacity-100 opacity-0 text-xs`}>{item.inProgress}</p>
                    </span>
                  )}
                  {item.completed > 0 && (
                    <span
                      className="group-hover:w-5 flex justify-center items-center aspect-square bg-timeLineCompleteBg rounded-full"
                    >
                      <p className={`${item.month === nowMonth && year === nowYear ? "opacity-100 w-5" : "w-4"} group-hover:opacity-100 opacity-0 text-xs`}>{item.completed}</p>
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

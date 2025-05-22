import IconTriangle from "../../assets/Icon-triangle.svg?react";
import YearSlideBar from "../common/YearSlideBar.tsx";
import { usePageStore } from "../../store/pageStore.ts";
import { useDateStore } from "../../store/useDateStore.ts";
import { useEffect, useState } from "react";
import { fetchTimeLineReadingList } from "../../api/timeLineReadingListApi.ts";
import { fetchTimeLineReadingListParams, TimelineEntry } from "../../types/timeLine.ts";

export default function TimeLine() {

  const { setRightContent } = usePageStore(); // Zustand에서 상태 업데이트 함수 가져오기
  const { year } = useDateStore(); // Zustand에서 년도 정보 가져오기

  const statsMonth = (month: number) => {
    setRightContent(
      'StatsPage',
      { StatsPage: { tab: 'StatsMonth' } }, // 파라미터
      { title: `나의 리딩로그 - 월별통계 - ${month}월` }        // pageData (타이틀)
    )
  }
  const [timelineData, setTimelineData] = useState<TimelineEntry[]>([]);
  console.log(timelineData)
  const searchTimeLineReadingList = async ({ userId, year }: fetchTimeLineReadingListParams) => {
    try {
      const data = await fetchTimeLineReadingList({ userId, year });
      setTimelineData(data.timeLineReadingList);
    } catch (error) {
      console.error("쿼리 테스트 에러:", error);
    }
  };

  useEffect(() => {
    searchTimeLineReadingList({ userId: 1, year });
  }, [year]);

  const monthArr = [
    { name: '1월', month: '1', col: 3, row: 1 },
    { name: '2월', month: '2' , col: 5, row: 1 },
    { name: '3월', month: '3' , col: 7, row: 2 },
    { name: '4월', month: '4' , col: 6, row: 3 },
    { name: '5월', month: '5' , col: 4, row: 3 },
    { name: '6월', month: '6' , col: 2, row: 3 },
    { name: '7월', month: '7' , col: 1, row: 4 },
    { name: '8월', month: '8' , col: 3, row: 5 },
    { name: '9월', month: '9' , col: 5, row: 5 },
    { name: '10월', month: '10', col: 7, row: 6 },
    { name: '11월', month: '11', col: 6, row: 7 },
    { name: '12월', month: '12', col: 4, row: 7 },
  ];
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
        <span>{year}</span>
        <span>년 리딩로그 보러가기</span>
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>

      <button
        className="flex gap-2 justify-end items-center group"
        onClick={() =>
          setRightContent(
            'TimeTracking', {},
            { title: '이번 달 독서 리스트' },
          )
        }
      >
        이번 달 독서 리스트 보기
        <span className="text-yearSlide_Icon group-hover:text-yearSlide_Icon_Hover">
          <IconTriangle/>
        </span>
      </button>

      {/* 이번 년도 타임라인 표시 */}
      <article className="flex flex-1 p-2 text-timeLineMonthText text-sm">
        <ul className="grid grid-cols-7 grid-rows-7 w-full">
          {monthArr.map((item, idx) => (
            <li
              key={idx}
              className={`relative`}
              style={{ gridColumnStart: `${item.col}`, gridRowStart: `${item.row}` }}
            >
              <button
                onClick={() => statsMonth(idx)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-timeLineMonthCircle"
              >
                {item.month}
              </button>
            </li>
          ))}
        </ul>
        {/*<div className="relative flex w-[25%]">*/}
        {/*  <div*/}
        {/*    className="absolute top-[calc(33.3333%-10px)] bottom-[calc(33.3333%-10px)] border-r-0 rounded-l-full border-[10px] border-timeLineBorder w-full">*/}
        {/*    /!* 7월 *!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 -left-1.5 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('7')}*/}
        {/*    >*/}
        {/*      7*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 7);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:left-[120%] absolute flex flex-col gap-1 left-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="relative flex flex-col justify-between w-[50%]">*/}
        {/*  <div className="absolute top-0 h-2.5 w-full right-0 bg-timeLineBorder rounded-l-full">*/}
        {/*    /!* 1월 *!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[25%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('1')}*/}
        {/*    >*/}
        {/*      1*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 1);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:top-[120%] absolute flex gap-1 top-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*    /!* 2월 *!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[75%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('2')}*/}
        {/*    >*/}
        {/*      2*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 2);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:top-[120%] absolute flex gap-1 top-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="absolute bottom-2/3 h-2.5 w-full bg-timeLineBorder">*/}
        {/*    /!* 4월*!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('4')}*/}
        {/*    >*/}
        {/*      4*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 4);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:top-[120%] absolute flex gap-1 top-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*    /!* 5월 *!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('5')}*/}
        {/*    >*/}
        {/*      5*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 5);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:top-[120%] absolute flex gap-1 top-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*    /!* 6월 *!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('6')}*/}
        {/*    >*/}
        {/*      6*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 6);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:top-[120%] absolute flex gap-1 top-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="absolute top-2/3 h-2.5 w-full bg-timeLineBorder">*/}
        {/*    /!* 8월*!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[25%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('8')}*/}
        {/*    >*/}
        {/*      8*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 8);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:top-[120%] absolute flex gap-1 top-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*    /!* 9월 *!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[75%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('9')}*/}
        {/*    >*/}
        {/*      9*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 9);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:top-[120%] absolute flex gap-1 top-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className="absolute bottom-0 h-2.5 w-full bg-timeLineBorder rounded-l-full">*/}
        {/*    /!* 11월*!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('11')}*/}
        {/*    >*/}
        {/*      11*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 11);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:bottom-[120%] absolute flex gap-1 bottom-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*    /!* 12월 *!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('12')}*/}
        {/*    >*/}
        {/*      12*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 12);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:bottom-[120%] absolute flex gap-1 bottom-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="relative flex w-[25%]">*/}
        {/*  <div*/}
        {/*    className="absolute top-0 bottom-2/3 border-l-0 border-timeLineBorder rounded-r-full border-[10px] w-full">*/}
        {/*    /!* 3월 *!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[103%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('3')}*/}
        {/*    >*/}
        {/*      3*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 3);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:right-[120%] absolute flex flex-col gap-1 right-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div*/}
        {/*    className="absolute top-2/3 bottom-0 border-l-0 border-timeLineBorder rounded-r-full border-[10px] w-full">*/}
        {/*    /!* 10월 *!/*/}
        {/*    <div*/}
        {/*      className="group hover:border-[6px] hover:w-12 hover:border-timeLineMonthHoverCircle transition-all duration-200 ease-in-out*/}
        {/*      cursor-pointer flex justify-center items-center z-[1] absolute w-8 left-[103%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-timeLineMonthCircle rounded-full aspect-square"*/}
        {/*      onClick={() => statsMonth('10')}*/}
        {/*    >*/}
        {/*      10*/}
        {/*      {(() => {*/}
        {/*        const data = timelineData.find((d) => d.month === 10);*/}
        {/*        return data ? (*/}
        {/*          <div className="group-hover:right-[120%] absolute flex flex-col gap-1 right-[110%]">*/}
        {/*            {data?.noRead > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineNoReadBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.noRead}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.reading > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineReadingBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.reading}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*            {data?.complete > 0 && (*/}
        {/*              <span*/}
        {/*                className="group-hover:w-5 flex justify-center items-center w-4 aspect-square bg-timeLineCompleteBg rounded-full">*/}
        {/*                <p className="group-hover:opacity-100 opacity-0 text-xs">{data.complete}</p>*/}
        {/*              </span>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        ) : null;*/}
        {/*      })()}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </article>
    </section>
  );
}

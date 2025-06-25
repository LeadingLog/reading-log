import { http, HttpResponse } from 'msw';
import statsMonthList from "../dummyData/statsMonthListData/statsMonthList.json"
import statsYearList2025 from "../dummyData/statsYearListData/statsYearList2025.json"
import statsYearList2024 from "../dummyData/statsYearListData/statsYearList2024.json"
import statsYearList2023 from "../dummyData/statsYearListData/statsYearList2023.json"
import thisMonthReadingList from "../dummyData/thisMonthReadingListData/thisMonthReadingList.json";
import thisMonthReadingList2 from "../dummyData/thisMonthReadingListData/thisMonthReadingList2.json";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const readingRecordHandlers = [

  // 독서 타이머 기록
  http.post( `${serverUrl}/api/readingrecord/add`, async () => {
    console.log( `✅ [Mock API] 독서 타이머 기록 요청` );

    return HttpResponse.json( {
      success: true,
    } );
  } ),

  // 사용자의 총 독서 시간 조회
  http.get( `${serverUrl}/api/readingrecord/stats/time`, async () => {
    console.log( `✅ [Mock API] 총 독서 시간 요청` );

    return HttpResponse.json( {
      success: true,
      data: 4650
    } );
  } ),

  // 연별통계
  http.get( `${serverUrl}/api/readingrecord/stats/time/yylist`, async ({ request }) => {
    const url = new URL( request.url );
    const year = parseInt( url.searchParams.get( 'year' ) || '2025', 10 );

    if (year === 2025) {
      return HttpResponse.json( statsYearList2025 );
    } else if (year === 2024) {
      return HttpResponse.json( statsYearList2024 );
    } else if (year === 2023) {
      return HttpResponse.json( statsYearList2023 );
    } else {
      return HttpResponse.json( {
        timeLineReadingList: [],
      } );
    }
  } ),


  // 월별 통계
  http.get( `${serverUrl}/api/readingrecord/stats/time/yymm/book_id`, async () => {
    console.log( `✅ [Mock API] 월별 통계 요청` );

    return HttpResponse.json( statsMonthList )
  } ),

  // 오늘 독서 시간
  http.get( `${serverUrl}/api/readingrecord/stats/time/todayTime`, async () => {
    console.log( `✅ [Mock API] 오늘 독서 시간 요청` );

    return HttpResponse.json( {
      success: true,
      todayTime: 4650
    } );
  } ),
];
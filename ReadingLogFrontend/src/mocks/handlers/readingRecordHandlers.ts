import { http, HttpResponse } from 'msw';
import statsMonthList from "../dummyData/statsMonthListData/statsMonthList.json"
import statsYearList from "../dummyData/statsYearListData/statsYearList.json"

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
  http.get( `${serverUrl}/api/readingrecord/stats/time/yylist`, async () => {
    console.log( `✅ [Mock API] 월별 통계 요청` );

    return HttpResponse.json( statsYearList );
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
import { http, HttpResponse } from 'msw';
import favoriteListData from '../dummyData/favoriteListData/favoriteListData.json';
import favoriteListData2 from '../dummyData/favoriteListData/favoriteListData2.json';
import readingList_2024 from '../dummyData/timeLineReadingListData/ReadingList-2024.json';
import readingList_2025 from '../dummyData/timeLineReadingListData/ReadingList-2025.json';
import thisMonthReadingList from '../dummyData/thisMonthReadingListData/thisMonthReadingList.json';
import thisMonthReadingList2 from '../dummyData/thisMonthReadingListData/thisMonthReadingList2.json';
import myReadingList_all from '../dummyData/myReadingListData/myReadingList_all.json';
import myReadingList_all2 from '../dummyData/myReadingListData/myReadingList_all2.json';
import myReadingList_complete from '../dummyData/myReadingListData/myReadingList_complete.json';
import myReadingList_complete2 from '../dummyData/myReadingListData/myReadingList_complete2.json';
import myReadingList_noRead from '../dummyData/myReadingListData/myReadingList_noRead.json';
import myReadingList_noRead2 from '../dummyData/myReadingListData/myReadingList_noRead2.json';
import myReadingList_reading from '../dummyData/myReadingListData/myReadingList_reading.json';
import myReadingList_reading2 from '../dummyData/myReadingListData/myReadingList_reading2.json';
import { ReadingListAddApiRequestBody } from "../../types/readingListAdd.ts";
import { bookStatusChangeBody } from "../../types/bookStatusChange.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const readingListHandlers = [

  // 타임라인에 보여 질 년&월 도서 수
  http.get( `${serverUrl}/readinglist/timeline/yymm`, async ({ request }) => {
    const url = new URL( request.url );
    const year = parseInt( url.searchParams.get( 'year' ) || '2025', 10 );

    console.log( `✅ [Mock API] 타임라인에 보여 질 년 & 월 도서 수 요청` );

    if (year === 2025) {
      return HttpResponse.json( readingList_2025 );
    } else if (year === 2024) {
      return HttpResponse.json( readingList_2024 );
    } else {
      return HttpResponse.json( {
        timeLineReadingList: [],
      } );
    }
  } ),

  // 이번 달 독서 리스트 OR 월별 통계(하단 리스트)
  http.get( `${serverUrl}/readinglist/yymm`, async ({ request }) => {
    const url = new URL( request.url );
    const page = parseInt( url.searchParams.get( 'page' ) || '0', 10 );

    console.log( `✅ [Mock API] 이번 달 독서 리스트 OR 월별 통계(하단 리스트) 요청` );

    if (page === 0) {
      return HttpResponse.json( thisMonthReadingList ); // 0페이지 데이터
    } else if (page === 1) {
      return HttpResponse.json( thisMonthReadingList2 ); // 그 외 페이지 데이터
    } else {
      return HttpResponse.json( {
        monthlyReadingList: [],
      } );
    }
  } ),

  // 내 도서 목록 전체 조회 (관심도서 목록 포함)
  http.get( `${serverUrl}/readinglist/readingList`, async ({ request }) => {
    const url = new URL( request.url );
    const tabType = parseInt( url.searchParams.get( 'tabType' ) || '0', 10 );
    const page = parseInt( url.searchParams.get( 'page' ) || '0', 10 );
    console.log( `✅ [Mock API] 내 독서 목록 리스트 요청` );
    if (page === 0 && tabType === 0) {
      return HttpResponse.json( myReadingList_all )
    } else if (page === 1 && tabType === 0) {
      return HttpResponse.json( myReadingList_all2 )
    } else if (page === 0 && tabType === 1) {
      return HttpResponse.json( myReadingList_reading )
    } else if (page === 1 && tabType === 1) {
      return HttpResponse.json( myReadingList_reading2 )
    } else if (page === 0 && tabType === 2) {
      return HttpResponse.json( myReadingList_noRead )
    } else if (page === 1 && tabType === 2) {
      return HttpResponse.json( myReadingList_noRead2 )
    } else if (page === 0 && tabType === 3) {
      return HttpResponse.json( myReadingList_complete )
    } else if (page === 1 && tabType === 3) {
      return HttpResponse.json( myReadingList_complete2 )
    } else if (page === 0 && tabType === 4) {
      return HttpResponse.json( favoriteListData )
    } else if (page === 1 && tabType === 4) {
      return HttpResponse.json( favoriteListData2 )
    } else {
      return HttpResponse.json( {
        readingList: [],
      } );
    }
  } ),

  // 내 독서 목록 내부 검색 (제목 + 저자)
  http.get( `${serverUrl}/readinglist/search`, async ({ request }) => {
    const url = new URL( request.url );
    const query = url.searchParams.get( 'query' ) || '0';
    console.log( `✅ [Mock API] 내 독서 목록 내부 검색 요청` );

    if (query !== '') {
      return HttpResponse.json( myReadingList_all )
    }
  } ),

  // 독서 계획 추가
  http.post( `${serverUrl}/readinglist/add`, async ({ request }) => {
    const body = await request.json() as ReadingListAddApiRequestBody;
    if ( body.bookStatus === "INTERESTED" ) {
      console.log( `✅ [Mock API] 관심 도서 추가 요청` );
    } else {
      console.log( `✅ [Mock API] 독서 계획 추가 요청` );
    }

    return HttpResponse.json( {
      success: true,
    } );
  } ),

  // 도서 상태 변경 (내 독서 목록 -> 관심도서로 변경, 관심도서 -> 내 독서 목록으로 변경, 이번 달 독서리스트 독서 상태 토글 변경, 독서 타임 트래킹 시작 요청 도서가 읽기전인 경우)
  http.patch( `${serverUrl}/readinglist/update`, async ({ request }) => {
    const body = await request.json() as bookStatusChangeBody;
    if ( body.bookStatus === "INTERESTED" ) {
      console.log( `✅ [Mock API] 도서 상태 변경 -> 관심 도서로 변경` );
    } else if ( body.bookStatus === "COMPLETED" && !body.readStartDt ) {
      console.log( `✅ [Mock API] 도서 상태 변경 -> 토글 완독으로 변경` );
    } else if ( body.bookStatus === "IN_PROGRESS" && !body.readStartDt ) {
      console.log( `✅ [Mock API] 도서 상태 변경 -> 토글 독서중으로 변경` );
    } else if (body.readStartDt) {
      console.log( `✅ [Mock API] 도서 상태 변경 -> 독서 계획 변경 or 추가` );
    }

    return HttpResponse.json( {
      success: true,
    } );
  } ),

  // 도서 삭제
  http.delete( `${serverUrl}/readinglist/delete`, async () => {

    console.log( `✅ [Mock API] 도서 삭제 요청` );

    return HttpResponse.json( {
      success: true,
    } );
  } ),
];
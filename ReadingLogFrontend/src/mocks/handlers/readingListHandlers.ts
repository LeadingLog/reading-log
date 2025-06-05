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

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const readingListHandlers = [

  // 사용자의 관심 도서 목록 (즐겨찾기) 조회
  http.get( `${serverUrl}/readinglist/fvrts`, async ({ request }) => {
    const url = new URL( request.url );
    const userId = parseInt( url.searchParams.get( 'userId' ) || '1', 10 );
    const page = parseInt( url.searchParams.get( 'page' ) || '0', 10 );
    const size = parseInt( url.searchParams.get( 'size' ) || '21', 10 );

    console.log( `✅ [Mock API] 사용자의 관심 도서 목록 (즐겨찾기) 조회 userId: ${userId}, page: ${page}, size: ${size}` );

    if (page === 0) {
      return HttpResponse.json( favoriteListData ); // 0페이지 데이터
    } else if (page === 1) {
      return HttpResponse.json( favoriteListData2 ); // 그 외 페이지 데이터
    } else {
      return HttpResponse.json( {
        favoriteList: [],
      } );
    }
  } ),

  // 타임라인에 보여 질 년&월 도서 수
  http.get( `${serverUrl}/readinglist/timeline/yymm`, async ({ request }) => {
    const url = new URL( request.url );
    const userId = parseInt( url.searchParams.get( 'userId' ) || '1', 10 );
    const year = parseInt( url.searchParams.get( 'year' ) || '2025', 10 );

    console.log( `✅ [Mock API] 타임라인에 보여 질 년&월 도서 수 : userId: ${userId}, year: ${year}` );

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

  // 이번 달 독서 리스트
  http.get( `${serverUrl}/readinglist/yymm`, async ({ request }) => {
    const url = new URL( request.url );
    const userId = parseInt( url.searchParams.get( 'userId' ) || '1', 10 );
    const yearMonth = parseInt( url.searchParams.get( 'yearMonth' ) || '2025.05', 10 );
    const page = parseInt( url.searchParams.get( 'page' ) || '0', 10 );
    const size = parseInt( url.searchParams.get( 'size' ) || '20', 10 );

    console.log( `✅ [Mock API] 이번 달 독서 리스트 : userId: ${userId}, yearMonth: ${yearMonth} page: ${page}, size: ${size}` );

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

  // 내 도서 목록 전체 조회
  http.get( `${serverUrl}/readinglist/readingList`, async ({ request }) => {
    const url = new URL( request.url );
    const userId = parseInt( url.searchParams.get( 'userId' ) || '1', 10 );
    const tabType = parseInt( url.searchParams.get( 'tabType' ) || '0', 10 );
    const page = parseInt( url.searchParams.get( 'page' ) || '0', 10 );
    const size = parseInt( url.searchParams.get( 'size' ) || '21', 10 );
    console.log( `✅ [Mock API] 내 도서 목록 리스트 userId: ${userId}, tabType: ${tabType} page: ${page}, size: ${size}` );
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
    } else {
      return HttpResponse.json( {
        readingList: [],
      } );
    }
  } ),

  // 내 독서 목록 내부 검색 (제목 + 저자)
  http.get( `${serverUrl}/readinglist/search`, async ({ request }) => {
    const url = new URL( request.url );
    const userId = parseInt( url.searchParams.get( 'userId' ) || '1', 10 );
    const tabType = parseInt( url.searchParams.get( 'tabType' ) || '0', 10 );
    const query = url.searchParams.get( 'query' ) || '0';
    console.log( `✅ [Mock API] 내 도서 목록 리스트 userId: ${userId}, tabType: ${tabType} query: ${query}` );

    if (query !== '') {
      return HttpResponse.json( myReadingList_all )
    }
  } ),

  // 독서 계획 추가
  http.post(`${serverUrl}/readinglist/add`, async ({request}) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      success: true,
    });
  }),

  // 관심 도서 추가
  http.post( `${serverUrl}/readinglist/update`, async ({ request }) => {
    const body = await request.json();
    console.log( body );

    return HttpResponse.json( {
      success: true,
    } );
  } ),

  // 관심 도서 삭제
  http.post( `${serverUrl}/readinglist/delete`, async ({ request }) => {
    const body = await request.json();
    console.log( body );

    return HttpResponse.json( {
      success: true,
    } );
  } ),
];
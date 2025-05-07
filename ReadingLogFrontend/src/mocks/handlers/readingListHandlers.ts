import {http, HttpResponse} from 'msw';
import favoriteListData from '../dummyData/favoriteListData/favoriteListData.json';
import favoriteListData2 from '../dummyData/favoriteListData/favoriteListData2.json';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const readingListHandlers = [

  // 사용자의 관심 도서 목록 (즐겨찾기) 조회
  http.get(`${serverUrl}/readinglist/fvrts`, async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '21', 10);

    console.log(`page: ${page}, size: ${size}`);

    if (page === 0) {
      return HttpResponse.json(favoriteListData); // 0페이지 데이터
    } else {
      return HttpResponse.json(favoriteListData2); // 그 외 페이지 데이터
    }
  }),

  // 타임라인에 보여 질 년&월 도서 수
  http.get(`${serverUrl}/readinglist/timeline/yymm`, async ({request}) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      success: true,
      timeLineReadingList: [
        {
          month: 2, // 월
          noRead: 0, // 읽기 전 도서 수
          reading: 0, // 독서 중 도서 수
          complete: 0 // 완독 한 도서 수
        },
        {
          month: 3,
          noRead: 0,
          reading: 0,
          complete: 0
        },
        {
          month: 4,
          noRead: 0,
          reading: 0,
          complete: 0
        },
        {
          month: 5,
          noRead: 0,
          reading: 0,
          complete: 0
        },
      ]
    });
  }),

  // 이번 달 독서 리스트
  http.get(`${serverUrl}/readinglist/yymm`, async ({request}) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const size = url.searchParams.get('size');
    console.log(`page: ${page}, size: ${size}`);

    return HttpResponse.json({
      success: true,
      monthlyReadingList: [
        {
          title: "책 제목",
          author: "지은이",
          isbn13: "9791169663618",
          cover: "https://image.aladin.co.kr/product/35709/18/cover200/k632036125_1.jpg", // 알라딘에서 책 검색 시 가져온커버
          readStatus: "noRead", // 독서 상태
          isFavorite: true, // 관심도서 여부
          createdAt: "2025-01-01 11:11:11", // 추가한 시간
        },
        {
          title: "책 제목",
          author: "지은이",
          isbn13: "9791169663618",
          cover: "https://image.aladin.co.kr/product/35709/18/cover200/k632036125_1.jpg", // 알라딘에서 책 검색 시 가져온커버
          readStatus: "complete", // 독서 상태
          isFavorite: true, // 관심도서 여부
          createdAt: "2025-01-01 11:11:11", // 추가한 시간
        },
        {
          title: "책 제목",
          author: "지은이",
          isbn13: "9791169663618",
          cover: "https://image.aladin.co.kr/product/35709/18/cover200/k632036125_1.jpg", // 알라딘에서 책 검색 시 가져온커버
          readStatus: "reading", // 독서 상태
          isFavorite: false, // 관심도서 여부
          createdAt: "2025-01-01 11:11:11", // 추가한 시간
        },
      ],
      page: {
        size: 20, // 한 페이지에 포함된 항목 수
        number: 0, // 현재 페이지번호 0부터 시작
        totalElements: 58, // 전체 데이터의 총 개수
        totalPages: 3 // 전체 페이지 수
      }
    });
  }),

  // 내 도서 목록 전체 조회
  http.get(`${serverUrl}/readinglist/readingList`, async ({request}) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const size = url.searchParams.get('size');
    console.log(`page: ${page}, size: ${size}`);

    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      success: true,
      readingList: [
        {
          title: "책 제목",
          author: "지은이",
          isbn13: "9791169663618",
          cover: "https://image.aladin.co.kr/product/35709/18/cover200/k632036125_1.jpg", // 알라딘에서 책 검색 시 가져온커버
          readStatus: "noRead", // 독서 상태
          startRead: "2025-05-01", // 시작 달 일자는 무조건 1일입니다.
          endRead: "2025-06-30", // 종료 달 일자는 그 달의 마지막일자를 보냅니다.
          isFavorite: true, // 관심도서 여부
          createdAt: "2025-01-01 11:11:11", // 추가한 시간
        },
        {
          title: "책 제목",
          author: "지은이",
          isbn13: "9791169663618",
          cover: "https://image.aladin.co.kr/product/35709/18/cover200/k632036125_1.jpg", // 알라딘에서 책 검색 시 가져온커버
          readStatus: "complete", // 독서 상태
          startRead: "2025-05-01", // 시작 달 일자는 무조건 1일입니다.
          endRead: "2025-06-30", // 종료 달 일자는 그 달의 마지막일자를 보냅니다.
          isFavorite: true, // 관심도서 여부
          createdAt: "2025-01-01 11:11:11", // 추가한 시간
        },
        {
          title: "책 제목",
          author: "지은이",
          isbn13: "9791169663618",
          cover: "https://image.aladin.co.kr/product/35709/18/cover200/k632036125_1.jpg", // 알라딘에서 책 검색 시 가져온커버
          readStatus: "reading", // 독서 상태
          startRead: "2025-05-01", // 시작 달 일자는 무조건 1일입니다.
          endRead: "2025-06-30", // 종료 달 일자는 그 달의 마지막일자를 보냅니다.
          isFavorite: false, // 관심도서 여부
          createdAt: "2025-01-01 11:11:11", // 추가한 시간
        },
      ],
      page: {
        size: 20, // 한 페이지에 포함된 항목 수
        number: 0, // 현재 페이지번호 0부터 시작
        totalElements: 58, // 전체 데이터의 총 개수
        totalPages: 3 // 전체 페이지 수
      }
    });
  }),

  // 도서 상태값 변경(독서 중/완독)
  http.post(`${serverUrl}/readinglist/change_status`, async ({request}) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      success: true,
    });
  }),

  // 독서 계획 추가
  http.post(`${serverUrl}/readinglist/add`, async ({request}) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      success: true,
    });
  }),

  // 관심 도서 추가
  http.post(`${serverUrl}/readinglist/update`, async ({request}) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      success: true,
    });
  }),

  // 관심 도서 삭제
  http.post(`${serverUrl}/readinglist/delete`, async ({request}) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      success: true,
    });
  }),
];
import {http, HttpResponse} from 'msw';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const readingRecordHandlers = [
  http.get(`${serverUrl}/test4`, () => {
    return HttpResponse.json({
      test: 'test'
    });
  }),

  // 독서 타이머 기록
  http.post(`${serverUrl}/api/readingrecord/add`, async ({request}) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      success: true,
    });
  }),

  // 사용자의 연간 총 독서 시간 조회
  http.get(`${serverUrl}/api/readingrecord/stats/time/yy`, async ({request}) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    const year = url.searchParams.get('year');
    console.log(`userId: ${userId}, year: ${year}`);

    return HttpResponse.json({
      success: true,
      data: 240
    });
  }),

  // 사용자의 총 독서 시간 조회
  http.get(`${serverUrl}/api/readingrecord/stats/time`, async ({request}) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    console.log(`userId: ${userId}`);

    return HttpResponse.json({
      success: true,
      data: 465
    });
  }),

  // 사용자의 특정 년도의 월 별 독서 시간 조회
  http.get(`${serverUrl}/api/readingrecord/stats/time/yylist`, async ({request}) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    const year = url.searchParams.get('year');
    console.log(`userId: ${userId}, year: ${year}`);

    return HttpResponse.json({
      success: true,
      data: [
        {
          month: 2,
          totalTime: 25
        },
        {
          month: 4,
          totalTime: 50
        },
        {
          month: 6,
          totalTime: 40
        },
        {
          month: 7,
          totalTime: 30
        },
      ]
    });
  }),

  // 사용자의 전체 년도와 월별 읽은 책 (시간 중심)
  http.get(`${serverUrl}/api/readingrecord/stats/time/book_id`, async ({request}) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    console.log(`userId: ${userId}`);

    return HttpResponse.json({
      success: true,
      data: [
        {
          month: 2,
          year: 2024,
          bookTime: {
            book_003: 25
          }
        },
        {
          month: 4,
          year: 2024,
          bookTime: {
            book_001: 50
          }
        },
        {
          month: 6,
          year: 2024,
          bookTime: {
            book_002: 40
          }
        },
        {
          month: 7,
          year: 2024,
          bookTime: {
            book_004: 30
          }
        },
        {
          month: 9,
          year: 2024,
          bookTime: {
            book_005: 45
          }
        },
        {
          month: 1,
          year: 2025,
          bookTime: {
            book_002: 20,
            book_003: 35
          }
        },
        {
          month: 3,
          year: 2025,
          bookTime: {
            book_004: 40
          }
        },
        {
          month: 4,
          year: 2025,
          bookTime: {
            book_001: 50,
            book_005: 60
          }
        }
      ],
    });
  }),

  // 사용자의 전체 년도와 월별 읽은 책 (책 중심)
  http.get(`${serverUrl}/api/readingrecord/stats/book/book_id`, async ({request}) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    console.log(`userId: ${userId}`);

    return HttpResponse.json({
      success: true,
      data: [
        {
          timeDate: {
            "2024-04": 50,
            "2025-04" :50
          },
          bookId: "book_001"
        },
        {
          timeDate: {
            "2025-01": 20,
            "2024-06" :40
          },
          bookId: "book_002"
        },
      ]
    });
  }),

  // 사용자의 특정 년,월에 읽은 책과 해당 책의 총 독서시간
  http.get(`${serverUrl}/api/readingrecord/stats/time/yymm/book_id`, async ({request}) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    const year = url.searchParams.get('year');
    const month = url.searchParams.get('month');
    console.log(`userId: ${userId}, year: ${year}, month: ${month}`);

    return HttpResponse.json({
      success: true,
      data: [
        {"book_001": 110},
        {"book_002": 100},
        {"book_003": 35},
        {"book_004": 25},
      ]
    });
  }),
];
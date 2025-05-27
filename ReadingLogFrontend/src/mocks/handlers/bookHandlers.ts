import {http, HttpResponse} from 'msw';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const bookHandlers = [
  // 검색된 도서 클릭시
  http.get(`${serverUrl}/book/search/detail`, async ({request}) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      startRead: "2024-06-01", // 일자는 무조건 1일
      endRead: "2024-08-31", // 일자는 무조건 달의 마지말 일
      isFavorite: true
    });
  }),

  // 키워드로 검색(제목+저자)
  http.get(`${serverUrl}/books/search`, async ({request}) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const query = url.searchParams.get('query');
    const start = url.searchParams.get('start');
    console.log(`userId: ${userId}`, `query: ${query}, start: ${start}`);

    // TODO. 응답 결과 작성하기
    return HttpResponse.json({
      success : true, //
      userId : "각 사용자를 구분하는 요소", // 사용자를 구분하기 위한 요소
      version: "20131101",
      logo: "http://image.aladin.co.kr/img/header/2011/aladin_logo_new.gif",
      title: "알라딘 검색결과 - d",
      link: "http://www.aladin.co.kr/search/wsearchresult.aspx?KeyWord=d&amp;SearchTarget=book&amp;partner=openAPI",
      pubDate: "Sun, 20 Apr 2025 10:45:01 GMT",
      totalResults: 13428,
      startIndex: 1,
      itemsPerPage: 10,
      query: "d",
      searchCategoryId: 0,
      searchCategoryName: "전체",
      item: [
        {
          isFavorite : true,  // 사용자의 관심도서인지 판단(true or false)
          title: "2025 문동균 한국사 D-30 문단속 모의고사",
          link: "http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=357091883&amp;partner=openAPI&amp;start=api",
          author: "문동균 (지은이)",
          pubDate: "2025-02-10",
          description: "시험 직전 한국사를 빠르게 회독하고 실전 감각을 기를 수 있는 마무리용 교재다. 최종 마무리를 체계적으로 할 수 있도록 D-30 문단속 학습법을 제시하였으며, 이에 따른 계획표로 5회독이 가능하다.",
          isbn: "K632036125",
          isbn13: "9791169663618",
          itemId: 357091883,
          priceSales: 13500,
          priceStandard: 15000,
          mallType: "BOOK",
          stockStatus: "",
          mileage: 150,
          cover: "https://image.aladin.co.kr/product/35709/18/cover200/k632036125_1.jpg",
          categoryId: 34631,
          categoryName: "국내도서>수험서/자격증>공무원 수험서>7/9급 공무원>한국사>기출/문제집/모의고사",
          publisher: "에스티유니타스",
          salesPoint: 18740,
          adult: false,
          fixedPrice: true,
          customerReviewRank: 0,
          subInfo: {}
        },
      ]
    });
  }),
];
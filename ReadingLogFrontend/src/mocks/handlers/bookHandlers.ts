import { http, HttpResponse } from 'msw';
import aladinSearchData from '../dummyData/aladinSearchData/aladinSearchData.json'
import aladinSearchData2 from '../dummyData/aladinSearchData/aladinSearchData2.json'

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const bookHandlers = [

  // 키워드로 검색(제목+저자)
  http.get(`${serverUrl}/books/search`, async ({request}) => {
    const url = new URL(request.url);
    const start = url.searchParams.get('start');
    console.log( `✅ [Mock API] 알라딘 검색 결과 요청` );

    // TODO. 응답 결과 작성하기
    if (start === '1') {
      return HttpResponse.json( aladinSearchData ); // 0페이지 데이터
    } else if (start === '2') {
      return HttpResponse.json( aladinSearchData2 ); // 그 외 페이지 데이터
    } else {
      return HttpResponse.json( {
        favoriteList: [],
      } );
    }
  }),
];
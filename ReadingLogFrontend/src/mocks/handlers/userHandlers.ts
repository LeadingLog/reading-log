// import { http, HttpResponse } from 'msw';

// const serverUrl = import.meta.env.VITE_SERVER_URL;

export const userHandlers = [

  // local에서 로그인 테스트를 위해, mock 연결 해제
  // 소셜 로그인/회원가입 -카카오 (application/x-www-form-urlencoded)
  /*
  http.post( `${serverUrl}/user/kakaologin`, async ({ request }) => {
    const text = await request.text();
    const params = new URLSearchParams( text ); // form 데이터 파싱
    const code = params.get( 'code' );
    const state = params.get( 'state' );
    console.log( `code: ${code}, state: ${state}` );

    return HttpResponse.json( {
      insDate: "2025-06-12T06:59:21.011+00:00",
      nickname: "mockKakaoUser",
      updDate: "2025-06-12T06:59:21.011+00:00",
      userEmail: "mockKakao@example.com",
      userId: -1,
      userUUID: "4277843147"
    } );
  } ),
   */

  // 소셜 로그인/회원가입 -네이버 (application/x-www-form-urlencoded)
  /*
  http.post( `${serverUrl}/user/naverlogin`, async ({ request }) => {
    const text = await request.text();
    const params = new URLSearchParams( text ); // form 데이터 파싱
    const code = params.get( 'code' );
    const state = params.get( 'state' );
    console.log( `code: ${code}, state: ${state}` );

    return HttpResponse.json( {
      userId: 'mocked-naver-id',
      nickname: 'MockNaverUser',
      userEmail: 'mockNaver@example.com',
    } );
  } ),
   */

  // 회원 정보 수정
  /*
  http.post( `${serverUrl}/user/user_id/modified`, async ({ request }) => {
    const url = new URL( request.url );
    const userId = url.searchParams.get( 'user_id' );
    const nickname = url.searchParams.get( 'nickname' );
    const email = url.searchParams.get( 'email' );
    console.log( `userId: ${userId}, nickname: ${nickname}, email: ${email}` );

    return HttpResponse.json( {
      success: true,
      data: {
        nickname: "새로운 닉네임",
        email: "new@example.com"
      }
    } );
  } ),
   */

  // 로그아웃
  /*
  http.post( `${serverUrl}/user/logout`, async ({ request }) => {
    const url = new URL( request.url );
    const provider = url.searchParams.get( 'provider' );
    const userId = url.searchParams.get( 'user_id' );
    console.log( `userId: ${userId}, provider: ${provider}` );

    return HttpResponse.json( {
      success: true,
    } );
  } ),
   */

  // 탈퇴
  /*
  http.delete( `${serverUrl}/user/:userId/delete`, async ({ request, params }) => {
    const body = await request.json() as { userId: string };
    const userIdFromParam = params.userId; // URL에서 가져온 userId (/user/123/delete)
    const userIdFromBody = body.userId;     // body에서 보낸 userId ({ userId: 123 })

    console.log( `userId (from URL param): ${userIdFromParam}` );
    console.log( `userId (from body): ${userIdFromBody}` );

    return HttpResponse.json( {
      success: true,
    } );
  } ),
   */

  // 세션 연장
  /*
  http.get( `${serverUrl}/user/extend_session`, async ({ request }) => {
    const url = new URL( request.url );
    const userId = url.searchParams.get( 'user_id' );
    console.log( `userId: ${userId}` );

    return HttpResponse.json( {
      success: true,
    } );
  } ),
   */

];
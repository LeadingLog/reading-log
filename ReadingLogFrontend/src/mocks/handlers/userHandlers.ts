import { http, HttpResponse } from 'msw';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const userHandlers = [
  http.post(`${serverUrl}/user/kakaologin`, async () => {
    return HttpResponse.json({
      users: {
        userId: 'mocked-kakao-id',
        nickname: 'MockKakaoUser',
        email: 'mocKakao@example.com',
      },
    });
  }),

  http.post(`${serverUrl}/user/naverlogin`, async () => {
    return HttpResponse.json({
      users: {
        userId: 'mocked-naver-id',
        nickname: 'MockNaverUser',
        email: 'mockNaver@example.com',
      },
    });
  }),

  http.get(`${serverUrl}/test`, () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];
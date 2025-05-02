import { http, HttpResponse } from 'msw';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const readingListHandlers = [
  http.get(`${serverUrl}/test3`, () => {
    return HttpResponse.json({
      test: 'test'
    });
  }),
];
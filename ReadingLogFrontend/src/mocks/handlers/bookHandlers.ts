import { http, HttpResponse } from 'msw';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const bookHandlers = [
  http.get(`${serverUrl}/test2`, () => {
    return HttpResponse.json({
      test: 'test'
    });
  }),
];
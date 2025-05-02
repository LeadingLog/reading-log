import { http, HttpResponse } from 'msw';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const readingRecordHandlers = [
  http.get(`${serverUrl}/test4`, () => {
    return HttpResponse.json({
      test: 'test'
    });
  }),
];
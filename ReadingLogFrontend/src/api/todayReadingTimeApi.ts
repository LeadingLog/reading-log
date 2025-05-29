import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchTodayReadingTime = async (userId : number) => {

  try {
    const response = await axios.get(`${serverUrl}/api/readingrecord/stats/time/yy`, {
      params: {
        userId: userId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error; // 오류를 던져서 호출한 곳에서 처리하도록 함
  }
};
import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchTodayReadingTime = async (userId : number) => {
  const response = await axios.get(`${serverUrl}/api/readingrecord/stats/time/yy`, {
    params: {
      userId: userId,
    },
  });

  return response.data;
};
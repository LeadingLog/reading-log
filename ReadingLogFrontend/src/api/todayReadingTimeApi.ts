import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchTodayReadingTime = async (userId: number | null) => {
  return await axios.get( `${serverUrl}/api/readingrecord/stats/time/todayTime`, {
    params: {
      userId: userId,
    },
  } );
};
import axios from 'axios';
import { fetchTodayReadingTimeApiParams } from "../types/todayReadingTime.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchTodayReadingTime = async (userId: fetchTodayReadingTimeApiParams) => {
  return await axios.get( `${serverUrl}/api/readingrecord/stats/time/todayTime`, {
    params: {
      userId: userId,
    },
  } );
};
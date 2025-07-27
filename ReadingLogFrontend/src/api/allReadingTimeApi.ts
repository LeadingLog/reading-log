import axios from 'axios';
import { fetchAllReadingTimeParams } from "../types/timeLine.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchAllReadingTime = async ({ userId }: fetchAllReadingTimeParams) => {

  const response = await axios.get( `${serverUrl}/api/readingrecord/stats/time`, {
    params: {
      userId: userId,
    },
  } );

  return response.data;
};
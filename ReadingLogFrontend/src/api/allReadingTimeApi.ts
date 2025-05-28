import axios from 'axios';
import { fetchAllReadingTimeParams } from "../types/timeLine.ts";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchAllReadingTime = async ({ userId }: fetchAllReadingTimeParams) => {

  try {
    const response = await axios.get(`${serverUrl}/api/readingrecord/stats/time`, {
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
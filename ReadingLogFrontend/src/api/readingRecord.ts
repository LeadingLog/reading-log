import { ReadingRecord } from "../types/readingRecord.ts";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export async function saveReadingRecordApi(readingRecord: ReadingRecord) {
  const { data } = await axios.post(
    `${serverUrl}/api/readingrecord/add`, readingRecord, {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return data;
}

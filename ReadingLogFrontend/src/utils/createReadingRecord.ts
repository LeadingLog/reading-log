import {ReadingRecord} from "../types/readingRecord.ts";

interface CreateReadingRecordParams {
  bookId: string;
  userId: number;
  startTimestamp: Date;
  time: {
    hour: number;
    minute: number;
  }
}

export function createReadingRecord({
                                      bookId, userId, startTimestamp, time
                                    }: CreateReadingRecordParams): ReadingRecord {
  const totalTime = (time.hour * 60) + time.minute;
  const endDate = new Date(startTimestamp.getTime() + totalTime * 60000);

  return {
    userId,
    bookId,
    readDate: startTimestamp.toISOString().split("T")[0],
    totalTime,
    startTime: startTimestamp.toTimeString().split(" ")[0],
    endTime: endDate.toTimeString().split(" ")[0],
  };
}


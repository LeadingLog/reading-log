import {ReadingRecord} from "../types/readingRecord.ts";

interface CreateReadingRecordParams {
  bookId: number;
  userId: number;
  startTimestamp: Date;
  time: {
    hour: number;
    minute: number;
    second: number;
  }
}

export function createReadingRecord({
                                      bookId, userId, startTimestamp, time
                                    }: CreateReadingRecordParams): ReadingRecord {
  const totalTime = (time.hour * 60 * 60) + (time.minute * 60) + time.second;
  const endDate = new Date(startTimestamp.getTime() + totalTime * 1000);

  return {
    bookId,
    userId,
    readDate: startTimestamp.toISOString().split("T")[0],
    totalTime,
    startTime: startTimestamp.toTimeString().split(" ")[0],
    endTime: endDate.toTimeString().split(" ")[0],
  };
}


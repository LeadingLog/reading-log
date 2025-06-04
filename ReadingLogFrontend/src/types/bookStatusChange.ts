export interface bookStatusChangeBody {
  userId: number | null;
  bookId: number | null;
  bookStatus: "INTERESTED" | "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED";
  readStartDt?: string;
  readEndDt?: string;
}
// useTooltipStore.ts
import { create } from "zustand";

type HoverContentType =
  | "StatsMonthBookTimeGraph"
  | "StatsMonthReadingList"
  | "StatsYearCompleteBookGraph"
  | "";

type PageData = {
  bookId: number;
  bookTitle: string;
  bookStatus: string;
  bookTime: number;
};

type TooltipStore = {
  hoverContent: HoverContentType;
  pageData: PageData | null;
  mouseX: number;
  mouseY: number;
  setHoverContent: (
    hoverContent: HoverContentType,
    pageData?: PageData | null,
    mouseX?: number,
    mouseY?: number
  ) => void;
};

export const useTooltipStore = create<TooltipStore>((set) => ({
  hoverContent: "",
  pageData: null,
  mouseX: 0,
  mouseY: 0,
  setHoverContent: (content, pageData = null, mouseX = 0, mouseY = 0) =>
    set({
      hoverContent: content,
      pageData,
      mouseX,
      mouseY,
    }),
}));

import { create } from "zustand";

interface DateStore {
  year: number;
  month: number; // 1~12
  day: number;

  setDate: (year: number, month: number, day: number) => void;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDay: (day: number) => void;
  today: () => void;

  increaseYear: () => void;
  decreaseYear: () => void;

  increaseMonth: () => void;
  decreaseMonth: () => void;
}

const now = new Date();

export const useDateStore = create<DateStore>( (set, get) => ({
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  day: now.getDate(),

  setDate: (year, month, day) => set( { year, month, day } ),
  setYear: (year) => set( { year } ),
  setMonth: (month) => set( { month } ),
  setDay: (day) => set( { day } ),

  today: () =>
    set( {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    } ),

  increaseYear: () => set( (state) => ({ year: state.year + 1 }) ),
  decreaseYear: () => set( (state) => ({ year: state.year - 1 }) ),

  increaseMonth: () => {
    const { year, month } = get();
    if (month === 12) {
      set( { year: year + 1, month: 1 } );
    } else {
      set( { month: month + 1 } );
    }
  },

  decreaseMonth: () => {
    const { year, month } = get();
    if (month === 1) {
      set( { year: year - 1, month: 12 } );
    } else {
      set( { month: month - 1 } );
    }
  },
}) );

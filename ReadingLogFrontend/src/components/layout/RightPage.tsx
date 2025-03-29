// import ThisMonthReadingList from "../homeRight/ThisMonthReadingList.tsx";
import TimeTracking from "../homeRight/TimeTracking.tsx";

export default function RightPage() {
  return (
    <section className="flex flex-col flex-1 overflow-hidden gap-4 h-full bg-pageBg rounded-xl p-7">
      {/*<ThisMonthReadingList/>*/}
      <TimeTracking/>
    </section>
  );
}

import { parseISO, format, eachDayOfInterval } from "date-fns";
import { TimelineItem } from "../../../types/types";

export function useTimelinePosition(items: TimelineItem[]) {
  const timestamps = items.flatMap(item => [
    parseISO(item.start).getTime(),
    parseISO(item.end).getTime(),
  ]);
  const min = Math.min(...timestamps);
  const max = Math.max(...timestamps);

  const totalDays = Math.ceil((max - min) / (1000 * 60 * 60 * 24));
  const daysArray = eachDayOfInterval({ start: new Date(min), end: new Date(max) });

  const getOffset = (start: string) => {
    const diff = parseISO(start).getTime() - min;
    return (diff / (1000 * 60 * 60 * 24)) / totalDays * 100;
  };

  const getWidth = (start: string, end: string) => {
    const diff = parseISO(end).getTime() - parseISO(start).getTime();
    return (diff / (1000 * 60 * 60 * 24)) / totalDays * 100;
  };

  const months: { label: string; startIndex: number; dayCount: number }[] = [];
  let currentMonth = "";
  let startIndex = 0;

  daysArray.forEach((day, index) => {
    const label = format(day, "MMM yyyy");
    if (label !== currentMonth) {
      if (currentMonth !== "") {
        months.push({
          label: currentMonth,
          startIndex,
          dayCount: index - startIndex,
        });
      }
      currentMonth = label;
      startIndex = index;
    }
    if (index === daysArray.length - 1) {
      months.push({
        label: currentMonth,
        startIndex,
        dayCount: index - startIndex + 1,
      });
    }
  });

  return {
    totalDays,
    getOffset,
    getWidth,
    minDate: new Date(min),
    maxDate: new Date(max),
    months,
  };
}

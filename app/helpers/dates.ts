import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
// dayjs().to(dayjs("1990-01-01"));

export type tDateFormat = "currDay" | "dayAgo" | "nextDay" | "timeAgo" | "time";
export const dateFormat = ({
  initDate,
  format,
  endDate,
}: {
  initDate: string | number | Date;
  endDate?: string | number | Date;
  format: tDateFormat;
}) => {
  const date: Record<tDateFormat, string> = {
    currDay: dayjs(initDate).format("YYYY-M-DD"),
    nextDay: dayjs(initDate).add(1, "day").format("YYYY-M-DD"),
    dayAgo: "",
    time: dayjs(initDate).format("h:mm:ss A"),
    // @ts-ignore
    timeAgo: dayjs(initDate).from(endDate || "", true),
  };

  return { date: date[format], allFormats: date };
};

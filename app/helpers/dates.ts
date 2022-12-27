import dayjs from "dayjs";

export type tDateFormat = "currDay" | "dayAgo" | "nextDay";
export const dateFormat = ({
  initDate,
  format,
}: {
  initDate: string | number | Date;
  format: tDateFormat;
}) => {
  const date: Record<tDateFormat, string> = {
    currDay: dayjs(initDate).format("YYYY-M-DD"),
    nextDay: dayjs(initDate).add(1, "day").format("YYYY-M-DD"),
    dayAgo: "",
  };

  return { date: date[format], allFormats: date };
};

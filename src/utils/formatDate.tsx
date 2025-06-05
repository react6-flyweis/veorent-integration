export function formatDate(date: Date | string, withTime?: boolean): string {
  if (!date) {
    return "N/A";
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return withTime
    ? `${dateObj.toLocaleDateString("en-US", dateOptions)} | ${dateObj.toLocaleTimeString("en-US", timeOptions).toLowerCase()}`
    : dateObj.toLocaleDateString("en-US", dateOptions);
}

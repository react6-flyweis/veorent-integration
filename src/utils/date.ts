export function getDaysLeft(date: Date | string): number {
  if (!date) {
    return 0;
  }

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 0;
  }

  const today = new Date();
  const timeDiff = dateObj.getTime() - today.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return daysLeft >= 0 ? daysLeft : 0;
}

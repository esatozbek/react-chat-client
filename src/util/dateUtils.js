export function getCurrentDayFromDate(timestamp) {
  const date = new Date(timestamp);
  return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
}

export function isToday(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

const formatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(date) {
  return formatter.format(date);
}

export function getCurrentDayFromDate(timestamp) {
  const date = new Date(timestamp);

  return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
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

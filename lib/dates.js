// "2026-12-05" → "5 Dec 2026". Uses UTC so the day never shifts.
export function formatEventDate(isoDate) {
  if (!isoDate) return "";
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Today's date in the user's time zone as "YYYY-MM-DD", plus `years`.
export function isoDateFromToday(years = 0) {
  const d = new Date();
  d.setFullYear(d.getFullYear() + years);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

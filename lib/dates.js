// Today's date in the user's time zone as "YYYY-MM-DD", plus `years`.
export function isoDateFromToday(years = 0) {
  const d = new Date();
  d.setFullYear(d.getFullYear() + years);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

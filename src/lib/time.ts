/**
 * Formats a 24-hour "HH:MM" time string as a 12-hour clock with AM/PM.
 * e.g. "07:00" → "7:00 AM", "17:00" → "5:00 PM", "13:00" → "1:00 PM".
 *
 * Config stores 24-hour times because the LocalBusiness JSON-LD `openingHours`
 * field requires them; this helper is for human-facing display only. Any token
 * that isn't an HH:MM time (e.g. "Closed") is returned unchanged.
 */
export function formatTime(value: string): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return value;
  let hours = Number(match[1]);
  const minutes = match[2];
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${period}`;
}

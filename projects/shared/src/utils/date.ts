export function convertLocalToUtc(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export function convertUtcToLocal(date: Date, timezone: string): Date {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const values: Record<string, string> = {};
  for (const part of parts) {
    values[part.type] = part.value;
  }
  return new Date(
    parseInt(values.year!),
    parseInt(values.month!) - 1,
    parseInt(values.day!),
    parseInt(values.hour!),
    parseInt(values.minute!),
    parseInt(values.second!)
  );
}

export function normalizeDateFields(
  obj: Record<string, unknown>,
  dateFieldNames: string[] = ["start_date", "end_date"]
): Record<string, unknown> {
  const normalizedValue = { ...obj };
  for (const fieldName of dateFieldNames) {
    if (fieldName in normalizedValue) {
      const fieldValue = normalizedValue[fieldName];
      if (fieldValue === null || fieldValue === undefined) {
        normalizedValue[fieldName] = "";
      }
    }
  }
  return normalizedValue;
}

export function formatDateRelative(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const curDate = new Date();
  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth();
  const curDay = curDate.getDate();

  if (day === curDay && month === curMonth && year === curYear) {
    return formatTime(date);
  }

  const yesterday = new Date(curDate);
  yesterday.setDate(curDate.getDate() - 1);

  if (
    day === yesterday.getDate() &&
    month === yesterday.getMonth() &&
    year === yesterday.getFullYear()
  ) {
    return `Yesterday ${formatTime(date)}`;
  }

  return formatLocaleDate(date);
}

export function formatTime(date: Date | string): string {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatLocaleDate(date: Date | string): string {
  if (typeof date === "string" && date === "") {
    date = new Date();
  }
  if (typeof date === "string") {
    date = new Date(date);
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function generateCalendarDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(new Date(date));
  }
  return days;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.toDateString() === date2.toDateString();
}

import { START_DATE, TOTAL_DAYS } from "../constants/startDate.js";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Returns effective date for the app.
 * For testing: use ?date=2026-02-14 in URL to simulate that date.
 * Example: http://localhost:5173/?date=2026-02-14
 */
export function getEffectiveDate() {
  const params = new URLSearchParams(window.location.search);
  const override = params.get("date");
  if (override) {
    const parsed = new Date(override + "T12:00:00");
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}

export function isTestMode() {
  return new URLSearchParams(window.location.search).has("date");
}

/**
 * Returns day number (1-10) for the given date, or null if outside range.
 * Day 1 = START_DATE, Day 2 = START_DATE + 1, etc.
 */
export function getDayNumberForDate(date) {
  const start = new Date(START_DATE + "T00:00:00");
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);

  const diffMs = d - start;
  const diffDays = Math.floor(diffMs / MS_PER_DAY);

  if (diffDays < 0 || diffDays >= TOTAL_DAYS) return null;
  return diffDays + 1;
}

/**
 * Returns the date for a given day number (1-10).
 */
export function getDateForDay(dayNumber) {
  const start = new Date(START_DATE + "T00:00:00");
  const d = new Date(start);
  d.setDate(d.getDate() + dayNumber - 1);
  return d;
}

/**
 * Formats date as DD.MM.YYYY for display.
 */
export function formatDate(date) {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formats date as DD.MM (without year).
 */
export function formatDateShort(date) {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  });
}

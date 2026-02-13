import { useState, useEffect, useMemo } from "react";
import {
  getEffectiveDate,
  getDayNumberForDate,
  getDateForDay,
  isTestMode,
} from "../utils/dateUtils.js";
import { TOTAL_DAYS } from "../constants/startDate.js";

const OPENED_DAYS_KEY = "valentine_opened_days";

function loadOpenedDays() {
  try {
    const raw = localStorage.getItem(OPENED_DAYS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveOpenedDays(days) {
  localStorage.setItem(OPENED_DAYS_KEY, JSON.stringify(days));
}

export function useValentineState() {
  const [openedDays, setOpenedDays] = useState(loadOpenedDays);

  const effectiveDate = useMemo(() => getEffectiveDate(), []);
  const currentDayNumber = useMemo(
    () => getDayNumberForDate(effectiveDate),
    [effectiveDate]
  );

  const keysBalance =
    currentDayNumber !== null && !openedDays.includes(currentDayNumber) ? 1 : 0;

  const openDay = (day) => {
    if (day.id !== currentDayNumber) return false;
    if (openedDays.includes(day.id)) return false;
    const next = [...openedDays, day.id].sort((a, b) => a - b);
    setOpenedDays(next);
    saveOpenedDays(next);
    return true;
  };

  const getDayStatus = (dayId) => {
    if (currentDayNumber === null) {
      const endDate = getDateForDay(TOTAL_DAYS);
      return effectiveDate > endDate ? "locked" : "future";
    }
    if (dayId === currentDayNumber) {
      return openedDays.includes(dayId) ? "opened" : "available";
    }
    if (dayId < currentDayNumber) return "locked";
    return "future";
  };

  return {
    effectiveDate,
    currentDayNumber,
    keysBalance,
    openedDays,
    openDay,
    getDayStatus,
    isTestMode: isTestMode(),
  };
}

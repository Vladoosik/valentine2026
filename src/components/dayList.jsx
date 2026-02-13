import { getDateForDay, formatDateShort } from "../utils/dateUtils.js";

const STATUS_CONFIG = {
  available: {
    icon: "💌",
    label: "Открыть",
    accent: "available",
  },
  opened: {
    icon: "💚",
    label: "Посмотреть снова",
    accent: "opened",
  },
  locked: {
    icon: "🔒",
    label: "Пропущено",
    accent: "locked",
  },
  future: {
    icon: "🔒",
    label: "Ещё не время",
    accent: "future",
  },
};

export const DayList = ({ day, status, onOpen }) => {
  const config = STATUS_CONFIG[status];
  const date = getDateForDay(day.id);

  const handleClick = () => {
    onOpen(day);
  };

  return (
    <div
      className={`dayItem dayItem--${status}`}
      onClick={handleClick}
      title={config.label}
    >
      <span className="dayItem-icon">{config.icon}</span>
      <span className="dayItem-number">День {day.id}</span>
      <span className="dayItem-date">{formatDateShort(date)}</span>
    </div>
  );
};

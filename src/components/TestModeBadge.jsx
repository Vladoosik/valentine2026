import { getEffectiveDate, formatDate } from "../utils/dateUtils.js";
import "./TestModeBadge.css";

export const TestModeBadge = () => {
  const date = getEffectiveDate();
  return (
    <div className="test-mode-badge" title="Режим тестирования: дата из ?date= в URL">
      Тест: {formatDate(date)}
    </div>
  );
};

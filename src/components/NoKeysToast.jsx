import { useEffect } from "react";
import "./NoKeysToast.css";

const MESSAGES = {
  no_keys: "Нет ключей. Заходи каждый день за новым!",
  locked: "Этот день уже прошёл — пропущено.",
  future: "Ещё не время. Заходи в свой день!",
};

export const NoKeysToast = ({ onClose, reason = "no_keys" }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="no-keys-toast">
      <span className="no-keys-icon">🔒</span>
      <p>{MESSAGES[reason] ?? MESSAGES.no_keys}</p>
    </div>
  );
};

import "./KeysBalance.css";

export const KeysBalance = ({ count, onInfoClick }) => {
  return (
    <div className="keys-header">
      <div className="keys-balance">
        <span className="keys-icon">🔑</span>
        <span className="keys-count">{count}</span>
      </div>
      <a
        href="https://valentine-gamma-five.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="keys-link-btn"
        title="Прошлая валентинка"
        aria-label="Прошлая валентинка"
      >
        💌
      </a>
      <button
        type="button"
        className="keys-info-btn"
        onClick={onInfoClick}
        title="Информация"
        aria-label="Информация"
      >
        ℹ️
      </button>
    </div>
  );
};

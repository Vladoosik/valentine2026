import "./KeysBalance.css";

export const KeysBalance = ({ count, onInfoClick }) => {
  return (
    <div className="keys-header">
      <div className="keys-balance">
        <span className="keys-icon">🔑</span>
        <span className="keys-count">{count}</span>
      </div>
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

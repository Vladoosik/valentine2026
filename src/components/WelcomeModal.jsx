import "./WelcomeModal.css";

export const WelcomeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-heart">💌</div>
        <h2 className="modal-title">Привет, это твоя валентинка</h2>

        <div className="modal-body">
          <p>
            Заходи сюда каждый день и будешь получать по одному ключу в день.
          </p>
          <p className="modal-highlight">1 ключ — 1 дверь</p>
          <p>Если пропустишь — потом открыть не сможешь.</p>
          <p>
            Ключ у тебя будет храниться в течение 1 дня, после чего сгорает,
            если ты им не воспользовалась.
          </p>
        </div>

        <p className="modal-love">Люблю Тебя 💗</p>

        <button className="modal-button" onClick={onClose}>
          Понятно, милый 💕
        </button>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import "./EnvelopeModal.css";

export const EnvelopeModal = ({ day, onClose }) => {
  const [stage, setStage] = useState("closed"); // closed → opening → letter → text
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    // envelope flap opens
    const t1 = setTimeout(() => setStage("opening"), 100);
    // letter slides up
    const t2 = setTimeout(() => setStage("letter"), 800);
    // text fades in on the letter
    const t3 = setTimeout(() => setStage("text"), 1400);
    // close button appears 2.5s after text
    const t4 = setTimeout(() => setShowClose(true), 3900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="envelope-overlay">
      <div className="envelope-scene">
        <div className="envelope-wrapper">
        {/* ── envelope ── */}
        <div className={`envelope ${stage}`}>
          {/* flap (triangle lid) */}
          <div className="envelope-flap" />

          {/* envelope body */}
          <div className="envelope-body">
            <div className="envelope-body-inner" />
            <div className="envelope-label envelope-label--from">
              <span className="envelope-label-title">От:</span>
              <span className="envelope-label-text">меня</span>
            </div>
            <div className="envelope-label envelope-label--to">
              <span className="envelope-label-title">Кому:</span>
              <span className="envelope-label-text">{day.to || 'сладкой булочке'} 💕</span>
            </div>
          </div>

          {/* letter that rises */}
          <div className="envelope-letter">
            <div className="letter-content">
              <span className="letter-day">День {day.id}</span>
              <p className="letter-text">{day.text}</p>
            </div>
          </div>
        </div>
        </div>

        {/* close button — delayed */}
        <button
          className={`envelope-close ${showClose ? "visible" : ""}`}
          onClick={onClose}
        >
          Закрыть 💌
        </button>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import "./App.css";
import CustomParticles from "./components/customParticals.jsx";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadHeartShape } from "@tsparticles/shape-heart";
import { DayList } from "./components/dayList.jsx";
import { WelcomeModal } from "./components/WelcomeModal.jsx";
import { EnvelopeModal } from "./components/EnvelopeModal.jsx";
import { KeysBalance } from "./components/KeysBalance.jsx";
import { NoKeysToast } from "./components/NoKeysToast.jsx";
import { TestModeBadge } from "./components/TestModeBadge.jsx";
import { FRAGMENTS } from "./constants/fragments.js";
import { useValentineState } from "./hooks/useValentineState.js";

const WELCOME_CLOSED_KEY = "valentine_welcome_closed";

function App() {
    const [openDay, setOpenDay] = useState(null);
    const [toastReason, setToastReason] = useState(null);
    const [showWelcomeModal, setShowWelcomeModal] = useState(
        () => localStorage.getItem(WELCOME_CLOSED_KEY) !== "true"
    );

    const {
        keysBalance,
        openDay: tryOpenDay,
        getDayStatus,
        isTestMode,
    } = useValentineState();

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
            await loadHeartShape(engine);
        });
    }, []);

    const handleOpenDay = (day) => {
        const status = getDayStatus(day.id);
        if (status === "opened") {
            setOpenDay(day);
        } else if (status === "available" && keysBalance > 0) {
            const ok = tryOpenDay(day);
            if (ok) setOpenDay(day);
        } else if (status === "available" && keysBalance === 0) {
            setToastReason("no_keys");
        } else if (status === "locked") {
            setToastReason("locked");
        } else if (status === "future") {
            setToastReason("future");
        }
    };

    return (
        <div className="app">
            <WelcomeModal
                isOpen={showWelcomeModal}
                onClose={() => {
                    setShowWelcomeModal(false);
                    localStorage.setItem(WELCOME_CLOSED_KEY, "true");
                }}
            />
            <KeysBalance
                count={keysBalance}
                onInfoClick={() => setShowWelcomeModal(true)}
            />
            {isTestMode && <TestModeBadge />}
            {openDay && (
                <EnvelopeModal day={openDay} onClose={() => setOpenDay(null)} />
            )}
            {toastReason && (
                <NoKeysToast
                    reason={toastReason}
                    onClose={() => setToastReason(null)}
                />
            )}
            <div className="content">
                {FRAGMENTS.map((item) => (
                    <DayList
                        key={item.id}
                        day={item}
                        status={getDayStatus(item.id)}
                        onOpen={handleOpenDay}
                    />
                ))}
            </div>
            <CustomParticles />
        </div>
    );
}

export default App;

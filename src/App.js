import { useCallback, useEffect, useState } from "react";
import ModalConfirm from "./components/ModalConfirm";
import NavMenu from "./components/NavMenu";
import PageAccueil from "./components/pages/PageAccueil";
import PageBilan from "./components/pages/PageBilan";
import PageMatiere from "./components/pages/PageMatiere";
import Toast from "./components/Toast";
import { MATIERES } from "./data";
import {
  STORAGE_KEY,
  initAnswers,
  loadFromStorage,
  saveToStorage,
} from "./utils/storage";

export default function App() {
  const [page, setPage] = useState("accueil");
  const [matiereIndex, setMatiereIndex] = useState(0);
  const [nom, setNom] = useState("");
  const [answers, setAnswers] = useState(initAnswers);
  const [hasSession, setHasSession] = useState(false);
  const [sessionNom, setSessionNom] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [showResetModal, setShowResetModal] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);

  // Chargement initial unique depuis localStorage
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved?.answers) {
      setAnswers(saved.answers);
      setNom(saved.nom || "");
      setSessionNom(saved.nom || "");
      setHasSession(true);
      if (saved.page && saved.page !== "accueil") {
        setPage(saved.page);
        setMatiereIndex(saved.matiereIndex ?? 0);
        showToast("Progression restauree");
      }
    }
  }, []); // eslint-disable-line

  // Sauvegarde automatique a chaque modification
  useEffect(() => {
    saveToStorage({ nom, answers, page, matiereIndex });
  }, [nom, answers, page, matiereIndex]);

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

  // Calculs de progression globale
  const totalItems = MATIERES.reduce((s, m) => s + m.items.length, 0);
  const totalFilled = MATIERES.reduce(
    (s, m) =>
      s +
      (Array.isArray(answers[m.id]) ? answers[m.id] : []).filter(
        (a) => a.note !== null,
      ).length,
    0,
  );
  const progressPct = Math.round((totalFilled / totalItems) * 100);

  // Mise a jour d'une reponse
  const handleAnswer = useCallback((mId, itemIdx, field, value) => {
    setAnswers((prev) => {
      const next = { ...prev };
      if (itemIdx === null) {
        next[`comment_${mId}`] = value;
      } else {
        const arr = [...(Array.isArray(prev[mId]) ? prev[mId] : [])];
        arr[itemIdx] = { ...arr[itemIdx], [field]: value };
        next[mId] = arr;
      }
      return next;
    });
  }, []);

  const handleStart = (nomSaisi) => {
    setNom(nomSaisi);
    const saved = loadFromStorage();
    if (saved?.nom === nomSaisi && saved?.matiereIndex !== undefined) {
      setMatiereIndex(saved.matiereIndex);
    } else {
      setMatiereIndex(0);
    }
    setPage("matiere");
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (matiereIndex < MATIERES.length - 1) {
      setMatiereIndex((i) => i + 1);
    } else {
      setPage("bilan");
    }
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    if (page === "bilan") {
      setPage("matiere");
      setMatiereIndex(MATIERES.length - 1);
    } else if (matiereIndex > 0) {
      setMatiereIndex((i) => i - 1);
    }
    window.scrollTo(0, 0);
  };

  const handleGoToMatiere = (idx) => {
    setMatiereIndex(idx);
    setPage("matiere");
    window.scrollTo(0, 0);
  };

  const handleGoToBilan = () => {
    setPage("bilan");
    window.scrollTo(0, 0);
  };

  const handleReset = () => setShowResetModal(true);

  const confirmReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers(initAnswers());
    setNom("");
    setSessionNom("");
    setHasSession(false);
    setMatiereIndex(0);
    setPage("accueil");
    setShowResetModal(false);
    window.scrollTo(0, 0);
  };

  const showTopBar = page !== "accueil";
  const matiereLabel =
    page === "matiere"
      ? `${matiereIndex + 1}/${MATIERES.length} — ${MATIERES[matiereIndex]?.titre}`
      : "Bilan";

  return (
    <div className="app-shell">
      {/* Barre de navigation superieure */}
      {showTopBar && (
        <>
          <div className="top-bar">
            <button
              onClick={() => setShowNavMenu(true)}
              style={{
                background: "var(--accent)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                color: "var(--bg)",
                cursor: "pointer",
                padding: "5px 10px",
                fontSize: 15,
                lineHeight: 1,
                flexShrink: 0,
                fontWeight: 700,
              }}
              title="Navigation entre matières"
            >
              &#9776;
            </button>
            <span
              className="top-bar-title"
              style={{ flex: 1, margin: "0 10px" }}
            >
              {matiereLabel}
            </span>
            <span className="top-bar-progress">{progressPct}%</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </>
      )}

      {/* Pages */}
      {page === "accueil" && (
        <PageAccueil
          onStart={handleStart}
          hasSession={hasSession}
          sessionNom={sessionNom}
          progressPct={progressPct}
          totalFilled={totalFilled}
          totalItems={totalItems}
        />
      )}

      {page === "matiere" && (
        <PageMatiere
          matiere={MATIERES[matiereIndex]}
          matiereIndex={matiereIndex}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={matiereIndex === 0}
          isLast={matiereIndex === MATIERES.length - 1}
        />
      )}

      {page === "bilan" && (
        <PageBilan
          nom={nom}
          answers={answers}
          onPrev={handlePrev}
          onReset={handleReset}
          onGoToMatiere={handleGoToMatiere}
        />
      )}

      {/* Composants globaux */}
      <NavMenu
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        answers={answers}
        matiereIndex={matiereIndex}
        onGoToMatiere={handleGoToMatiere}
        onGoToBilan={handleGoToBilan}
        onReset={handleReset}
        page={page}
      />

      <Toast message={toast.message} visible={toast.visible} />

      <ModalConfirm
        visible={showResetModal}
        onConfirm={confirmReset}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
}

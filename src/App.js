import { useCallback, useEffect, useRef, useState } from "react";
import { MATIERES, NIVEAUX } from "./data";

const STORAGE_KEY = "auto_eval_b2_2025";

function initAnswers() {
  const a = {};
  MATIERES.forEach((m) => {
    a[m.id] = m.items.map(() => ({
      note: null,
      entreprise: false,
      observation: "",
    }));
    a[`comment_${m.id}`] = "";
  });
  return a;
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function exportCSV(nom, answers) {
  const BOM = "\uFEFF";
  const header = [
    "Nom",
    "Matiere",
    "Item",
    "Competence",
    "Niveau",
    "Pratique_entreprise",
    "Observation",
    "Commentaire_matiere",
  ];
  const rows = [header.join(";")];

  MATIERES.forEach((m) => {
    const commentMatiere = answers[`comment_${m.id}`] || "";
    m.items.forEach((item, idx) => {
      const a = (Array.isArray(answers[m.id]) ? answers[m.id] : [])[idx] || {};
      const row = [
        `"${nom}"`,
        `"${m.titre}"`,
        idx + 1,
        `"${item.replace(/"/g, '""')}"`,
        a.note ?? "",
        a.entreprise ? "Oui" : "Non",
        `"${(a.observation || "").replace(/"/g, '""')}"`,
        idx === 0 ? `"${commentMatiere.replace(/"/g, '""')}"` : '""',
      ];
      rows.push(row.join(";"));
    });
  });

  const csv = BOM + rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const nomFichier = `auto_evaluation_${nom.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "")}_B2_2025.csv`;
  link.setAttribute("href", url);
  link.setAttribute("download", nomFichier);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// =====================================================================
// TOAST
// =====================================================================
function Toast({ message, visible }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : 16}px)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        background: "var(--bg-card)",
        border: "1px solid var(--accent)",
        borderRadius: "var(--radius-md)",
        padding: "10px 18px",
        fontSize: 13,
        color: "var(--accent)",
        fontFamily: "var(--font-mono)",
        zIndex: 200,
        pointerEvents: "none",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 24px #0008",
      }}
    >
      {message}
    </div>
  );
}

// =====================================================================
// MODALE DE CONFIRMATION RESET
// =====================================================================
function ModalConfirm({ visible, onConfirm, onCancel }) {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "#0f172acc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "28px 24px",
          maxWidth: 360,
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--danger)",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Attention
        </div>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-primary)",
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          Recommencer depuis le début ?
        </p>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          Toutes les réponses enregistrées seront définitivement supprimées.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            className="btn"
            style={{
              background: "var(--danger)",
              color: "#fff",
              width: "100%",
            }}
            onClick={onConfirm}
          >
            Oui, tout effacer
          </button>
          <button
            className="btn btn-secondary"
            style={{ width: "100%" }}
            onClick={onCancel}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// PAGE ACCUEIL
// =====================================================================
function PageAccueil({ onStart, hasSession, sessionNom }) {
  const [nom, setNom] = useState(sessionNom || "");
  const [erreur, setErreur] = useState(false);

  const handleStart = () => {
    if (nom.trim().length < 3) {
      setErreur(true);
      return;
    }
    onStart(nom.trim());
  };

  return (
    <div className="main-content">
      <div style={{ paddingTop: 16, marginBottom: 32 }}>
        <div className="section-label">Bachelor Fullstack · B2 · 2025-2026</div>
        <h1 className="page-title">
          Auto-évaluation
          <br />
          de compétences
        </h1>
        <p className="page-subtitle">
          13 matières · {MATIERES.reduce((s, m) => s + m.items.length, 0)} items
          au total. Compter entre 20 et 30 minutes.
        </p>
      </div>

      {hasSession && (
        <div
          className="card"
          style={{ marginBottom: 24, borderColor: "var(--success)" }}
        >
          <div
            style={{
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              color: "var(--success)",
              marginBottom: 6,
            }}
          >
            Session en cours
          </div>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              lineHeight: 1.6,
            }}
          >
            Une progression a été retrouvée pour{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              {sessionNom}
            </strong>
            . En cliquant sur "Continuer", vous reprendrez là où vous en étiez.
          </p>
        </div>
      )}

      <div className="card card-disclaimer" style={{ marginBottom: 24 }}>
        <div
          style={{
            fontSize: 12,
            fontFamily: "var(--font-mono)",
            color: "var(--accent)",
            marginBottom: 10,
          }}
        >
          À lire avant de commencer
        </div>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}
        >
          Cet outil est strictement pédagogique. Il n'a aucune incidence sur les
          notes ni sur la validation de l'année. Les réponses sont
          confidentielles et ne sont accessibles qu'au class-manager de la
          promotion. Il n'y a pas de bonne ou de mauvaise réponse : l'honnêteté
          est la seule chose qui rende cet exercice utile.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="section-label" style={{ marginBottom: 12 }}>
          Légende des niveaux
        </div>
        <div className="legend-card">
          {NIVEAUX.map((n) => (
            <div className="legend-row" key={n.val}>
              <span className={`legend-num ${n.color}`}>{n.val}</span>
              <span className="legend-text">{n.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <label className="input-label" htmlFor="nom-input">
          Nom et prénom
        </label>
        <input
          id="nom-input"
          className="input-field"
          type="text"
          placeholder="ex : Martin Sophie"
          value={nom}
          onChange={(e) => {
            setNom(e.target.value);
            setErreur(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleStart()}
          autoComplete="name"
        />
        {erreur && (
          <p style={{ fontSize: 12, color: "var(--danger)", marginTop: 6 }}>
            Merci de renseigner le nom et prénom avant de continuer.
          </p>
        )}
        <div className="nav-row">
          <button className="btn btn-primary" onClick={handleStart}>
            {hasSession
              ? "Continuer l'auto-évaluation"
              : "Commencer l'auto-évaluation"}
          </button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// PAGE MATIÈRE
// =====================================================================
function PageMatiere({
  matiere,
  matiereIndex,
  answers,
  onAnswer,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) {
  const matiereAnswers = Array.isArray(answers[matiere.id])
    ? answers[matiere.id]
    : [];
  const filled = matiereAnswers.filter((a) => a.note !== null).length;
  const total = matiere.items.length;
  const itemRefs = useRef([]);

  const legendeActive = (itemIdx) => {
    const note = matiereAnswers[itemIdx]?.note;
    if (!note) return "Sélectionner un niveau";
    return NIVEAUX.find((n) => n.val === note)?.label || "";
  };

  const handleNote = (itemIdx, val) => {
    onAnswer(matiere.id, itemIdx, "note", val);
    // Scroll vers l'item suivant s'il existe
    const nextRef = itemRefs.current[itemIdx + 1];
    if (nextRef) {
      setTimeout(() => {
        nextRef.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  // Raccourcis clavier 1-5 sur l'item actif (le premier sans réponse)
  useEffect(() => {
    const firstUnanswered = matiereAnswers.findIndex((a) => a.note === null);
    const activeIdx = firstUnanswered === -1 ? null : firstUnanswered;

    const handleKey = (e) => {
      const n = parseInt(e.key);
      if (n >= 1 && n <= 5 && activeIdx !== null) {
        handleNote(activeIdx, n);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [matiereAnswers]); // eslint-disable-line

  return (
    <div className="main-content">
      <div style={{ marginBottom: 20 }}>
        <div className="section-label">
          Matière {matiereIndex + 1} sur {MATIERES.length}
        </div>
        <h2 className="matiere-title">{matiere.titre}</h2>
        <div className="matiere-counter">
          {filled}/{total} items renseignés
        </div>
      </div>

      {matiere.items.map((item, idx) => {
        const a = matiereAnswers[idx] || {};
        return (
          <div
            className={`item-block ${a.note ? "answered" : ""}`}
            key={idx}
            ref={(el) => (itemRefs.current[idx] = el)}
          >
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 14,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text-muted)",
                  minWidth: 20,
                  paddingTop: 2,
                  flexShrink: 0,
                }}
              >
                {idx + 1}.
              </span>
              <p className="item-text" style={{ margin: 0 }}>
                {item}
              </p>
            </div>

            <div className="rating-grid">
              {NIVEAUX.map((n) => (
                <button
                  key={n.val}
                  className={`rating-btn ${a.note === n.val ? `sel-${n.val}` : ""}`}
                  onClick={() => handleNote(idx, n.val)}
                  aria-label={`Niveau ${n.val}`}
                >
                  <span className="rating-num">{n.val}</span>
                  <span className="rating-dot" />
                </button>
              ))}
            </div>

            <div className="rating-legend">{legendeActive(idx)}</div>

            <div
              className="checkbox-row"
              onClick={() =>
                onAnswer(matiere.id, idx, "entreprise", !a.entreprise)
              }
              role="checkbox"
              aria-checked={a.entreprise}
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === " " &&
                onAnswer(matiere.id, idx, "entreprise", !a.entreprise)
              }
            >
              <div className={`checkbox-box ${a.entreprise ? "checked" : ""}`}>
                {a.entreprise && <span className="checkbox-check">✓</span>}
              </div>
              <span className="checkbox-label">Pratiqué en entreprise</span>
            </div>

            <label className="obs-label" htmlFor={`obs-${matiere.id}-${idx}`}>
              Observation (facultatif)
            </label>
            <textarea
              id={`obs-${matiere.id}-${idx}`}
              className="obs-textarea"
              placeholder="Contexte, blocage, remarque..."
              value={a.observation || ""}
              onChange={(e) =>
                onAnswer(matiere.id, idx, "observation", e.target.value)
              }
              rows={2}
            />
          </div>
        );
      })}

      <div className="comment-block">
        <div className="comment-block-label">
          Commentaire général sur cette matière (facultatif)
        </div>
        <textarea
          className="obs-textarea"
          placeholder="Remarque générale sur la matière..."
          value={answers[`comment_${matiere.id}`] || ""}
          onChange={(e) =>
            onAnswer(`comment_${matiere.id}`, null, null, e.target.value)
          }
          rows={3}
        />
      </div>

      <div className="nav-row">
        <button className="btn btn-primary" onClick={onNext}>
          {isLast ? "Voir le bilan" : "Matière suivante"}
        </button>
        {!isFirst && (
          <button className="btn btn-secondary" onClick={onPrev}>
            Retour
          </button>
        )}
      </div>
    </div>
  );
}

// =====================================================================
// PAGE BILAN
// =====================================================================
function PageBilan({ nom, answers, onPrev, onReset, onGoToMatiere }) {
  const totalItems = MATIERES.reduce((s, m) => s + m.items.length, 0);
  const totalFilled = MATIERES.reduce(
    (s, m) =>
      s +
      (Array.isArray(answers[m.id]) ? answers[m.id] : []).filter(
        (a) => a.note !== null,
      ).length,
    0,
  );
  const totalEntreprise = MATIERES.reduce(
    (s, m) =>
      s +
      (Array.isArray(answers[m.id]) ? answers[m.id] : []).filter(
        (a) => a.entreprise,
      ).length,
    0,
  );

  const moyenneGlobale = () => {
    let sum = 0,
      count = 0;
    MATIERES.forEach((m) => {
      (Array.isArray(answers[m.id]) ? answers[m.id] : []).forEach((a) => {
        if (a.note) {
          sum += a.note;
          count++;
        }
      });
    });
    return count > 0 ? (sum / count).toFixed(1) : "—";
  };

  const moyenneMatiere = (mId) => {
    const items = (Array.isArray(answers[mId]) ? answers[mId] : []).filter(
      (a) => a.note !== null,
    );
    if (!items.length) return null;
    return items.reduce((s, a) => s + a.note, 0) / items.length;
  };

  const barColor = (avg) => {
    if (!avg) return "var(--border)";
    if (avg < 2) return "#f87171";
    if (avg < 3) return "#fbbf24";
    if (avg < 4) return "#6ee7b7";
    if (avg < 4.5) return "#38bdf8";
    return "#34d399";
  };

  return (
    <div className="main-content">
      <div style={{ paddingTop: 16, marginBottom: 24 }}>
        <div className="section-label">Résultats</div>
        <h2 className="matiere-title">Bilan de l'auto-évaluation</h2>
        <p
          style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}
        >
          {nom}
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-num">
            {totalFilled}/{totalItems}
          </span>
          <span className="stat-label">items renseignés</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{moyenneGlobale()}</span>
          <span className="stat-label">score moyen sur 5</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{totalEntreprise}</span>
          <span className="stat-label">items en entreprise</span>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div className="section-label" style={{ marginBottom: 0 }}>
            Score par matière
          </div>
          {/* Seuil visuel */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <div
              style={{
                width: 20,
                height: 2,
                background: "var(--text-muted)",
                opacity: 0.5,
                borderTop: "1px dashed var(--text-muted)",
              }}
            />
            seuil acquis (3/5)
          </div>
        </div>

        {MATIERES.map((m, mIdx) => {
          const avg = moyenneMatiere(m.id);
          const pct = avg ? (avg / 5) * 100 : 0;
          const seuilPct = (3 / 5) * 100; // 60%
          return (
            <div className="bilan-matiere" key={m.id}>
              <div className="bilan-matiere-header">
                <button
                  onClick={() => onGoToMatiere(mIdx)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    color: "var(--text-primary)",
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "var(--font-sans)",
                    textDecoration: "underline",
                    textDecorationColor: "var(--border)",
                    textUnderlineOffset: 3,
                  }}
                  title={`Retourner à "${m.titre}"`}
                >
                  {m.titre}
                </button>
                <span className="bilan-score">
                  {avg ? avg.toFixed(1) + "/5" : "—"}
                </span>
              </div>
              <div className="bilan-bar-track" style={{ position: "relative" }}>
                <div
                  className="bilan-bar-fill"
                  style={{ width: `${pct}%`, background: barColor(avg) }}
                />
                {/* Ligne seuil à 3/5 */}
                <div
                  style={{
                    position: "absolute",
                    left: `${seuilPct}%`,
                    top: -3,
                    bottom: -3,
                    width: 1,
                    background: "var(--text-muted)",
                    opacity: 0.4,
                  }}
                />
              </div>
            </div>
          );
        })}

        <p
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            marginTop: 16,
            lineHeight: 1.5,
          }}
        >
          Cliquer sur le nom d'une matière pour y retourner et modifier des
          réponses.
        </p>
      </div>

      <div className="card card-disclaimer" style={{ marginBottom: 20 }}>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}
        >
          Ce bilan n'est visible que sur cet écran. Pour le transmettre au
          class-manager, télécharger le fichier CSV ci-dessous et l'envoyer par
          email.
        </p>
      </div>

      <div className="nav-row" style={{ flexDirection: "column", gap: 10 }}>
        <button
          className="btn btn-success"
          onClick={() => exportCSV(nom, answers)}
        >
          Télécharger mes résultats (CSV)
        </button>
        <button className="btn btn-secondary" onClick={onPrev}>
          Retour à la dernière matière
        </button>
        <button
          className="btn btn-secondary"
          style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
          onClick={onReset}
        >
          Recommencer depuis le début
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// APP PRINCIPALE
// =====================================================================
export default function App() {
  const [page, setPage] = useState("accueil");
  const [matiereIndex, setMatiereIndex] = useState(0);
  const [nom, setNom] = useState("");
  const [answers, setAnswers] = useState(initAnswers);
  const [hasSession, setHasSession] = useState(false);
  const [sessionNom, setSessionNom] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [showResetModal, setShowResetModal] = useState(false);

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
        showToast("Progression restaurée");
      } else {
        // On reste sur l'accueil mais on informe qu'une session existe
        setPage("accueil");
      }
    }
  }, []); // eslint-disable-line

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    saveToStorage({ nom, answers, page, matiereIndex });
  }, [nom, answers, page, matiereIndex]);

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

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

  const handleAnswer = useCallback((mId, itemIdx, field, value) => {
    setAnswers((prev) => {
      const next = { ...prev };
      if (itemIdx === null) {
        // Commentaire matière : stocker dans la clé dédiée, pas dans le tableau d'items
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
    // On repart de l'index sauvegardé si même nom, sinon de 0
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

  const handleReset = () => {
    setShowResetModal(true);
  };

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
      {showTopBar && (
        <>
          <div className="top-bar">
            <span className="top-bar-title">{matiereLabel}</span>
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

      {page === "accueil" && (
        <PageAccueil
          onStart={handleStart}
          hasSession={hasSession}
          sessionNom={sessionNom}
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

      <Toast message={toast.message} visible={toast.visible} />

      <ModalConfirm
        visible={showResetModal}
        onConfirm={confirmReset}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
}

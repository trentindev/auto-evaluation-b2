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
          Recommencer depuis le debut ?
        </p>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          Toutes les reponses enregistrees seront definitvement supprimees.
          Cette action est irreversible.
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
// MENU NAVIGATION MATIERES (drawer lateral)
// =====================================================================
function NavMenu({
  visible,
  onClose,
  answers,
  matiereIndex,
  onGoToMatiere,
  onGoToBilan,
  page,
}) {
  if (!visible) return null;

  const filledByMatiere = (mId) => {
    const arr = Array.isArray(answers[mId]) ? answers[mId] : [];
    return arr.filter((a) => a.note !== null).length;
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 400,
        display: "flex",
      }}
      onClick={onClose}
    >
      <div
        style={{ position: "absolute", inset: 0, background: "#0f172acc" }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 320,
          height: "100%",
          background: "var(--bg-card)",
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          zIndex: 1,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tete */}
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            background: "var(--bg-card)",
            zIndex: 1,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 2,
              }}
            >
              Navigation
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              {MATIERES.length} matieres
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: 20,
              lineHeight: 1,
              padding: 4,
            }}
          >
            x
          </button>
        </div>

        {/* Liste des matieres */}
        <div style={{ padding: "8px 0", flex: 1 }}>
          {MATIERES.map((m, idx) => {
            const filled = filledByMatiere(m.id);
            const total = m.items.length;
            const isActive = page === "matiere" && idx === matiereIndex;
            const isComplete = filled === total;

            return (
              <button
                key={m.id}
                onClick={() => {
                  onGoToMatiere(idx);
                  onClose();
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 20px",
                  background: isActive ? "var(--accent-dim)" : "none",
                  border: "none",
                  borderLeft: isActive
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: isActive ? "var(--accent)" : "var(--text-muted)",
                        flexShrink: 0,
                        paddingTop: 1,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: isActive
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                        fontWeight: isActive ? 500 : 400,
                        lineHeight: 1.4,
                      }}
                    >
                      {m.titre}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      flexShrink: 0,
                      color: isComplete
                        ? "var(--success)"
                        : filled > 0
                          ? "var(--warning)"
                          : "var(--text-muted)",
                      paddingTop: 1,
                    }}
                  >
                    {filled}/{total}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Acces bilan en bas */}
        <div style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
          <button
            className="btn btn-secondary"
            style={{ width: "100%", fontSize: 13 }}
            onClick={() => {
              onGoToBilan();
              onClose();
            }}
          >
            Voir le bilan
          </button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// PAGE ACCUEIL
// =====================================================================
function PageAccueil({
  onStart,
  hasSession,
  sessionNom,
  progressPct,
  totalFilled,
  totalItems,
}) {
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
          Auto-evaluation
          <br />
          de competences
        </h1>
        <p className="page-subtitle">
          13 matieres · {MATIERES.reduce((s, m) => s + m.items.length, 0)} items
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
            Session en cours — {sessionNom}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              {totalFilled} / {totalItems} items renseignes
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--success)",
              }}
            >
              {progressPct}%
            </span>
          </div>
          <div
            style={{
              height: 4,
              background: "var(--border)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "var(--success)",
                borderRadius: 2,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              marginTop: 10,
              lineHeight: 1.5,
            }}
          >
            Reprendre la ou vous en etiez en cliquant sur "Continuer".
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
          A lire avant de commencer
        </div>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}
        >
          Cet outil est strictement pedagogique. Il n'a aucune incidence sur les
          notes ni sur la validation de l'annee. Les reponses sont
          confidentielles et ne sont accessibles qu'au class-manager de la
          promotion. Il n'y a pas de bonne ou de mauvaise reponse.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="section-label" style={{ marginBottom: 12 }}>
          Legende des niveaux
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
          Nom et prenom
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
            Merci de renseigner le nom et prenom avant de continuer.
          </p>
        )}
        <div className="nav-row">
          <button className="btn btn-primary" onClick={handleStart}>
            {hasSession
              ? "Continuer l'auto-evaluation"
              : "Commencer l'auto-evaluation"}
          </button>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// PAGE MATIERE
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
  const [filtreNonRepondus, setFiltreNonRepondus] = useState(false);

  const legendeActive = (itemIdx) => {
    const note = matiereAnswers[itemIdx]?.note;
    if (!note) return "Selectionner un niveau";
    return NIVEAUX.find((n) => n.val === note)?.label || "";
  };

  const handleNote = (itemIdx, val) => {
    onAnswer(matiere.id, itemIdx, "note", val);
    const updatedAnswers = matiereAnswers.map((a, i) =>
      i === itemIdx ? { ...a, note: val } : a,
    );
    const restants = updatedAnswers.filter((a) => a.note === null).length;
    if (restants === 0) setFiltreNonRepondus(false);

    setTimeout(() => {
      if (filtreNonRepondus) return;
      const nextUnanswered = matiereAnswers.findIndex(
        (a, i) => i > itemIdx && a.note === null,
      );
      const targetIdx = nextUnanswered !== -1 ? nextUnanswered : itemIdx + 1;
      const nextRef = itemRefs.current[targetIdx];
      if (nextRef)
        nextRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  // Raccourcis clavier 1-5, ignorer si focus dans un champ texte
  useEffect(() => {
    const firstUnanswered = matiereAnswers.findIndex((a) => a.note === null);
    const activeIdx = firstUnanswered === -1 ? null : firstUnanswered;

    const handleKey = (e) => {
      if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")
        return;
      const n = parseInt(e.key);
      if (n >= 1 && n <= 5 && activeIdx !== null) {
        handleNote(activeIdx, n);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [matiereAnswers]); // eslint-disable-line

  const nonRepondus = matiereAnswers.filter((a) => a.note === null).length;
  const itemsAffiches = filtreNonRepondus
    ? matiere.items
        .map((item, idx) => ({ item, idx }))
        .filter(({ idx }) => matiereAnswers[idx]?.note === null)
    : matiere.items.map((item, idx) => ({ item, idx }));

  return (
    <div className="main-content">
      <div style={{ marginBottom: 20 }}>
        <div className="section-label">
          Matiere {matiereIndex + 1} sur {MATIERES.length}
        </div>
        <h2 className="matiere-title">{matiere.titre}</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div className="matiere-counter">
            {filled}/{total} items renseignes
          </div>
          {nonRepondus > 0 && (
            <button
              onClick={() => setFiltreNonRepondus((f) => !f)}
              style={{
                background: filtreNonRepondus
                  ? "var(--warning)"
                  : "transparent",
                border: `1px solid ${filtreNonRepondus ? "var(--warning)" : "var(--border)"}`,
                borderRadius: "var(--radius-sm)",
                color: filtreNonRepondus ? "var(--bg)" : "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                padding: "4px 10px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {filtreNonRepondus
                ? "Afficher tout"
                : `${nonRepondus} sans reponse`}
            </button>
          )}
        </div>
      </div>

      {itemsAffiches.map(({ item, idx }) => {
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
                {a.entreprise && <span className="checkbox-check">v</span>}
              </div>
              <span className="checkbox-label">Pratique en entreprise</span>
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

      {filtreNonRepondus && nonRepondus === 0 && (
        <div
          className="card"
          style={{
            textAlign: "center",
            color: "var(--success)",
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          Tous les items sont renseignes !
        </div>
      )}

      <div className="comment-block">
        <div className="comment-block-label">
          Commentaire general sur cette matiere (facultatif)
        </div>
        <textarea
          className="obs-textarea"
          placeholder="Remarque generale sur la matiere..."
          value={answers[`comment_${matiere.id}`] || ""}
          onChange={(e) =>
            onAnswer(`comment_${matiere.id}`, null, null, e.target.value)
          }
          rows={3}
        />
      </div>

      <div className="nav-row">
        <button className="btn btn-primary" onClick={onNext}>
          {isLast ? "Voir le bilan" : "Matiere suivante"}
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
        <div className="section-label">Resultats</div>
        <h2 className="matiere-title">Bilan de l'auto-evaluation</h2>
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
          <span className="stat-label">items renseignes</span>
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
            Score par matiere
          </div>
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
                height: 1,
                borderTop: "1px dashed var(--text-muted)",
                opacity: 0.6,
              }}
            />
            seuil acquis (3/5)
          </div>
        </div>

        {MATIERES.map((m, mIdx) => {
          const avg = moyenneMatiere(m.id);
          const pct = avg ? (avg / 5) * 100 : 0;
          const seuilPct = 60;
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
          Cliquer sur le nom d'une matiere pour y retourner et modifier des
          reponses.
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
          Ce bilan n'est visible que sur cet ecran. Pour le transmettre au
          class-manager, telecharger le fichier CSV ci-dessous et l'envoyer par
          email.
        </p>
      </div>

      <div className="nav-row" style={{ flexDirection: "column", gap: 10 }}>
        <button
          className="btn btn-success"
          onClick={() => exportCSV(nom, answers)}
        >
          Telecharger mes resultats (CSV)
        </button>
        <button className="btn btn-secondary" onClick={onPrev}>
          Retour a la derniere matiere
        </button>
        <button
          className="btn btn-secondary"
          style={{ color: "var(--danger)", borderColor: "var(--danger)" }}
          onClick={onReset}
        >
          Recommencer depuis le debut
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
  const [showNavMenu, setShowNavMenu] = useState(false);

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
      {showTopBar && (
        <>
          <div className="top-bar">
            <button
              onClick={() => setShowNavMenu(true)}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                padding: "5px 9px",
                fontSize: 15,
                lineHeight: 1,
                flexShrink: 0,
              }}
              title="Navigation entre matieres"
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

      <NavMenu
        visible={showNavMenu}
        onClose={() => setShowNavMenu(false)}
        answers={answers}
        matiereIndex={matiereIndex}
        onGoToMatiere={handleGoToMatiere}
        onGoToBilan={handleGoToBilan}
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

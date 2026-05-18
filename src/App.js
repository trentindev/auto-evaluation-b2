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

// Helper : texte et aide d'un item (compatible string et objet)
function itemTexte(item) {
  return typeof item === "string" ? item : item.texte;
}
function itemAide(item) {
  return typeof item === "string" ? null : item.aide || null;
}
function isUrl(str) {
  return typeof str === "string" && str.startsWith("http");
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
        `"${itemTexte(item).replace(/"/g, '""')}"`,
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
        {/* Logo ESNL */}
        <div style={{ marginBottom: 24 }}>
          <img
            src="data:image/png;base64,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"
            alt="ESNL — Ecole Superieure du Numerique des Landes"
            style={{
              height: 56,
              width: "auto",
              display: "block",
            }}
          />
        </div>
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
  const [aideOuverte, setAideOuverte] = useState(null); // index de l'item dont l'aide est ouverte

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
      {/* Barre de navigation rapide en haut */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        {!isFirst ? (
          <button
            className="btn btn-secondary"
            onClick={onPrev}
            style={{ flex: 1, padding: "8px 12px", fontSize: 13 }}
          >
            &larr; Precedente
          </button>
        ) : (
          <div style={{ flex: 1 }} />
        )}
        <button
          className="btn btn-primary"
          onClick={onNext}
          style={{ flex: 1, padding: "8px 12px", fontSize: 13 }}
        >
          {isLast ? "Voir le bilan" : "Suivante \u2192"}
        </button>
      </div>

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
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="item-text" style={{ margin: 0 }}>
                  {itemTexte(item)}
                </p>
                {/* Panneau d'aide */}
                {itemAide(item) && (
                  <div style={{ marginTop: 8 }}>
                    <button
                      onClick={() =>
                        setAideOuverte(aideOuverte === idx ? null : idx)
                      }
                      style={{
                        background:
                          aideOuverte === idx
                            ? "var(--accent-dim)"
                            : "transparent",
                        border:
                          "1px solid " +
                          (aideOuverte === idx
                            ? "var(--accent)"
                            : "var(--border)"),
                        borderRadius: "var(--radius-sm)",
                        color:
                          aideOuverte === idx
                            ? "var(--accent)"
                            : "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        padding: "3px 9px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {aideOuverte === idx ? "Fermer" : "? Aide"}
                    </button>
                    {aideOuverte === idx && (
                      <div
                        style={{
                          marginTop: 8,
                          padding: "12px 14px",
                          background: "var(--accent-dim)",
                          border: "1px solid var(--accent)",
                          borderRadius: "var(--radius-sm)",
                          fontSize: 13,
                          color: "var(--text-secondary)",
                          lineHeight: 1.65,
                        }}
                      >
                        {isUrl(itemAide(item)) ? (
                          <a
                            href={itemAide(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "var(--accent)",
                              wordBreak: "break-all",
                            }}
                          >
                            {itemAide(item)}
                          </a>
                        ) : (
                          itemAide(item)
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
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

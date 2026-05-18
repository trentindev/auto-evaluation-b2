import { useEffect, useRef, useState } from "react";
import { MATIERES, NIVEAUX } from "../../data";
import { isUrl, itemAide, itemTexte } from "../../utils/helpers";

export default function PageMatiere({
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
  const [aideOuverte, setAideOuverte] = useState(null);

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

  // Reset aide et filtre quand on change de matiere
  useEffect(() => {
    setFiltreNonRepondus(false);
    setAideOuverte(null);
  }, [matiere.id]);

  const nonRepondus = matiereAnswers.filter((a) => a.note === null).length;
  const itemsAffiches = filtreNonRepondus
    ? matiere.items
        .map((item, idx) => ({ item, idx }))
        .filter(({ idx }) => matiereAnswers[idx]?.note === null)
    : matiere.items.map((item, idx) => ({ item, idx }));

  return (
    <div className="main-content">
      {/* Navigation rapide haut de page */}
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

      {/* En-tete matiere */}
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

      {/* Liste des items */}
      {itemsAffiches.map(({ item, idx }) => {
        const a = matiereAnswers[idx] || {};
        const aide = itemAide(item);

        return (
          <div
            className={`item-block ${a.note ? "answered" : ""}`}
            key={idx}
            ref={(el) => (itemRefs.current[idx] = el)}
          >
            {/* Texte + bouton aide */}
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
                {aide && (
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
                        border: `1px solid ${aideOuverte === idx ? "var(--accent)" : "var(--border)"}`,
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
                        {isUrl(aide) ? (
                          <a
                            href={aide}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "var(--accent)",
                              wordBreak: "break-all",
                            }}
                          >
                            {aide}
                          </a>
                        ) : (
                          aide
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Notation 1-5 */}
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

            {/* Pratique entreprise */}
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

            {/* Observation */}
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

      {/* Commentaire general matiere */}
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

      {/* Navigation bas de page */}
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

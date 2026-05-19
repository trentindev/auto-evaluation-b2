import { useState } from "react";
import { MATIERES, NIVEAUX } from "../../data";

export default function PageAccueil({
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
        <div style={{ marginBottom: 24 }}>
          <img
            src={`${process.env.PUBLIC_URL}/logo-esnl.png`}
            alt="ESNL — Ecole Superieure du Numerique des Landes"
            style={{ height: 56, width: "auto", display: "block" }}
          />
        </div>
        <div className="section-label">Bachelor Fullstack · B2 · 2025-2026</div>
        <h1 className="page-title">
          Auto-évaluation
          <br />
          de compétences
        </h1>
        <p className="page-subtitle">
          13 matières · {MATIERES.reduce((s, m) => s + m.items.length, 0)} items
          au total. Compter entre 3O et 45 minutes.
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
              {totalFilled} / {totalItems} items renseignés
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
            Reprendre là ou vous en étiez en cliquant sur "Continuer"
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
          Outil strictement pédagogique | Sans impact sur vos notes ou votre
          année. Vos réponses sont confidentielles et réservées au
          class-manager. Il n’y a pas de bonne ou de mauvaise réponse : c’est
          l’honnêteté de vos retours qui permettra de cibler les vraies
          priorités et d'améliorer concrètement votre formation.
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
            Merci de renseigner le nom et le prénom avant de continuer.
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

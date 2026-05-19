import { MATIERES } from "../../data";
import { exportCSV } from "../../utils/export";
import { barColor, moyenneMatiere } from "../../utils/helpers";

export default function PageBilan({
  nom,
  answers,
  onPrev,
  onReset,
  onGoToMatiere,
}) {
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

      {/* Statistiques globales */}
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

      {/* Scores par matiere */}
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
          const avg = moyenneMatiere(answers, m.id);
          const pct = avg ? (avg / 5) * 100 : 0;
          const seuilPct = 60; // 3/5

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
          Cliquer sur le nom d'une matière pour y retourner et modifier des
          rèponses.
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
          class-manager, télécharger le fichier CSV ci-dessous et envoyer le par
          email.
        </p>
      </div>

      {/* Actions */}
      <div className="nav-row" style={{ flexDirection: "column", gap: 10 }}>
        <button
          className="btn btn-success"
          onClick={() => exportCSV(nom, answers)}
        >
          Télécharger mes résultats (CSV)
        </button>
        <button className="btn btn-secondary" onClick={onPrev}>
          Retour à la derniere matière
        </button>
        <button
          className="btn btn-secondary"
          style={{ color: "var(--danger)", borderColor: "var(--danger)" }}
          onClick={onReset}
        >
          Recommencer depuis le début ⚠️
        </button>
      </div>
    </div>
  );
}

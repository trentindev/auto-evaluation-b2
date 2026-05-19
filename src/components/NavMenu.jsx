import { MATIERES } from "../data";
import { filledByMatiere } from "../utils/helpers";

export default function NavMenu({
  visible,
  onClose,
  answers,
  matiereIndex,
  onGoToMatiere,
  onGoToBilan,
  onReset,
  page,
}) {
  if (!visible) return null;

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
            const filled = filledByMatiere(answers, m.id);
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

        {/* Actions en bas */}
        <div
          style={{
            padding: 16,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
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
          <button
            className="btn btn-secondary"
            style={{
              width: "100%",
              fontSize: 13,
              color: "var(--danger)",
              borderColor: "var(--danger)",
            }}
            onClick={() => {
              onClose();
              onReset();
            }}
          >
            Recommencer depuis le début
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ModalConfirm({ visible, onConfirm, onCancel }) {
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
          Toutes les réponses enregistées seront définitivement supprimées.
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

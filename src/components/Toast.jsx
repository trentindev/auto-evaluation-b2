export default function Toast({ message, visible }) {
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

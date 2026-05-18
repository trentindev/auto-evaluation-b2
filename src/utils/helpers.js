// Compatibilité items string (ancienne structure) et objet { texte, aide }
export function itemTexte(item) {
  return typeof item === "string" ? item : item.texte;
}

export function itemAide(item) {
  return typeof item === "string" ? null : item.aide || null;
}

export function isUrl(str) {
  return typeof str === "string" && str.startsWith("http");
}

// Couleur de barre bilan selon moyenne
export function barColor(avg) {
  if (!avg) return "var(--border)";
  if (avg < 2) return "#f87171";
  if (avg < 3) return "#fbbf24";
  if (avg < 4) return "#6ee7b7";
  if (avg < 4.5) return "#38bdf8";
  return "#34d399";
}

// Moyenne des notes d'une matiere
export function moyenneMatiere(answers, mId) {
  const items = (Array.isArray(answers[mId]) ? answers[mId] : []).filter(
    (a) => a.note !== null,
  );
  if (!items.length) return null;
  return items.reduce((s, a) => s + a.note, 0) / items.length;
}

// Nombre d'items renseignes pour une matiere
export function filledByMatiere(answers, mId) {
  const arr = Array.isArray(answers[mId]) ? answers[mId] : [];
  return arr.filter((a) => a.note !== null).length;
}

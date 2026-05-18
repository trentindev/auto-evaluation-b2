import { MATIERES } from "../data";

export const STORAGE_KEY = "auto_eval_b2_2025";

export function initAnswers() {
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

export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

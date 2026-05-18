import { MATIERES } from "../data";
import { itemTexte } from "./helpers";

export function exportCSV(nom, answers) {
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

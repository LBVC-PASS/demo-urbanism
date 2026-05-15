// Arbre de questions — Cabanon / abri de jardin
// Règlement R-1300-2, Ville de Sainte-Marthe-sur-le-Lac (données fictives à des fins de démonstration)

const questions = [
  {
    id: "q1",
    text: "Quelle est la superficie au sol de la construction projetée?",
    type: "choice",
    helpText: "Mesurée hors-tout, en mètres carrés (longueur × largeur, incluant les surplombs de toit).",
    regulation: "Art. 4.2.1 — Règlement R-1300-2",
    options: [
      { label: "Moins de 15 m²", value: "small", next: "q2" },
      { label: "Entre 15 m² et 30 m²", value: "medium", next: "q2" },
      {
        label: "Plus de 30 m²",
        value: "large",
        next: "VOIE_REGULIERE",
        reason: "Les constructions accessoires de plus de 30 m² excèdent la superficie maximale permise. Une analyse complète par un urbaniste est requise (art. 4.2.1, R-1300-2).",
      },
    ],
  },
  {
    id: "q2",
    text: "Quelle sera la hauteur maximale de la construction?",
    type: "choice",
    helpText: "Mesurée depuis le niveau du sol naturel jusqu'au point le plus élevé de la toiture.",
    regulation: "Art. 4.2.3 — Règlement R-1300-2",
    options: [
      { label: "3 m ou moins", value: "low", next: "q3" },
      { label: "Entre 3 m et 4,5 m", value: "medium", next: "q3" },
      {
        label: "Plus de 4,5 m",
        value: "high",
        next: "VOIE_REGULIERE",
        reason: "La hauteur maximale autorisée pour une construction accessoire est de 4,5 m. Votre projet dépasse ce seuil et requiert une analyse réglementaire complète (art. 4.2.3, R-1300-2).",
      },
    ],
  },
  {
    id: "q3",
    text: "Quel sera le recul minimal par rapport aux lignes de propriété latérales et arrière?",
    type: "choice",
    helpText: "Distance entre le mur extérieur de la construction et la limite de votre terrain.",
    regulation: "Art. 4.3.1 — Règlement R-1300-2",
    options: [
      { label: "1,5 m ou plus", value: "sufficient", next: "q4" },
      {
        label: "Moins de 1,5 m",
        value: "insufficient",
        next: "VOIE_REGULIERE",
        reason: "Le recul minimal requis par rapport aux lignes de propriété latérales et arrière est de 1,5 m. Votre projet ne respecte pas cette exigence (art. 4.3.1, R-1300-2).",
      },
    ],
  },
  {
    id: "q4",
    text: "Le terrain est-il situé dans une zone de contraintes naturelles identifiée par la Ville?",
    type: "choice",
    helpText: "Cela inclut les zones inondables, les zones de mouvement de terrain, les rives et le littoral. Consultez la carte interactive sur le portail citoyen si vous n'êtes pas certain(e).",
    regulation: "Politique de protection des rives — PPRLPI",
    options: [
      { label: "Non, le terrain n'est pas en zone à contraintes", value: "no", next: "q5" },
      {
        label: "Oui, ou je ne suis pas certain(e)",
        value: "yes",
        next: "VOIE_REGULIERE",
        reason: "Tout projet situé dans une zone de contraintes naturelles (inondation, rive, mouvement de terrain) doit faire l'objet d'une analyse complète et peut nécessiter une autorisation provinciale. Veuillez soumettre une demande de permis complète.",
      },
    ],
  },
  {
    id: "q5",
    text: "Existe-t-il déjà une construction accessoire sur le terrain?",
    type: "choice",
    helpText: "Construction accessoire : cabanon, abri de jardin, garage détaché, remise, etc. Excluez la résidence principale.",
    regulation: "Art. 4.2.2 — Règlement R-1300-2",
    options: [
      { label: "Non, c'est la première", value: "none", next: "q6" },
      {
        label: "Oui, et la superficie totale (existante + projetée) demeure sous 30 m²",
        value: "exists_ok",
        next: "q6",
      },
      {
        label: "Oui, et la superficie totale (existante + projetée) dépasserait 30 m²",
        value: "exists_over",
        next: "VOIE_REGULIERE",
        reason: "La superficie cumulée de toutes les constructions accessoires sur un même terrain résidentiel ne peut excéder 30 m². Votre projet dépasse ce plafond (art. 4.2.2, R-1300-2).",
      },
    ],
  },
  {
    id: "q6",
    text: "Les matériaux de finition extérieure prévus sont-ils compatibles avec ceux de la résidence principale?",
    type: "choice",
    helpText: "Ex. de matériaux compatibles : bois, vinyle, bardage métallique peint, fibre de verre. Ex. non compatibles : béton apparent, tôle ondulée non traitée, plastique PVC brut.",
    regulation: "Art. 7.1.4 — Règlement d'urbanisme R-1300-2",
    options: [
      { label: "Oui, les matériaux sont compatibles", value: "compatible", next: "q7" },
      {
        label: "Non, ou je prévois des matériaux non compatibles",
        value: "incompatible",
        next: "VOIE_REGULIERE",
        reason: "Les matériaux de finition de la construction accessoire doivent être compatibles avec ceux de la résidence principale. Une analyse par l'urbaniste est requise pour évaluer l'intégration architecturale (art. 7.1.4, R-1300-2).",
      },
    ],
  },
  {
    id: "q7",
    text: "La construction sera-t-elle utilisée exclusivement à des fins accessoires à l'usage résidentiel?",
    type: "choice",
    helpText: "Usage accessoire : rangement, atelier de loisirs, remise à outils, abri de jardin. Usage non accessoire : activité commerciale, location, hébergement.",
    regulation: "Art. 3.1.1 — Règlement R-1300-2",
    options: [
      {
        label: "Oui, usage strictement résidentiel (rangement, atelier, loisirs)",
        value: "residential",
        next: "VOIE_RAPIDE",
      },
      {
        label: "Non, ou l'usage comprend une activité commerciale ou locative",
        value: "commercial",
        next: "VOIE_REGULIERE",
        reason: "Seuls les usages strictement accessoires à la résidence principale sont admissibles à la voie rapide. Tout usage commercial ou locatif nécessite une analyse complète (art. 3.1.1, R-1300-2).",
      },
    ],
  },
]

export default questions

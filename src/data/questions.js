// Questions — Remise / bâtiment accessoire
// Art. 126 (normes générales) et art. 155 (remise) — Règlement de zonage, Sainte-Marthe-sur-le-Lac

const questions = [
  {
    id: "q1",
    text: "La remise sera-t-elle implantée en cour avant principale (face à la rue principale)?",
    type: "choice",
    helpText: "La cour avant principale est la cour qui fait face à la voie publique principale. Les cours latérales, arrière et avant secondaire (terrain d'angle) sont permises.",
    regulation: "Art. 155, 2° — Règlement de zonage",
    options: [
      {
        label: "Non, implantation en cour latérale, arrière ou avant secondaire",
        value: "no",
        next: "q2",
      },
      {
        label: "Oui, implantation en cour avant principale (côté rue principale)",
        value: "yes",
        next: "VOIE_REGULIERE",
        reason: "Une remise n'est autorisée qu'en cour avant secondaire, latérale et arrière. L'implantation en cour avant principale n'est pas permise (art. 155, 2°).",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q2",
    text: "Y a-t-il déjà une remise sur ce terrain?",
    type: "choice",
    helpText: "Une seule remise est autorisée par logement sur un terrain. Les autres constructions accessoires (garage détaché, abri d'auto, etc.) ne comptent pas comme remise.",
    regulation: "Art. 155, 1° — Règlement de zonage",
    options: [
      { label: "Non, c'est la première remise sur ce terrain", value: "no", next: "q3" },
      {
        label: "Oui, il existe déjà une remise sur ce terrain",
        value: "yes",
        next: "VOIE_REGULIERE",
        reason: "Une seule remise par logement est autorisée sur un terrain. L'ajout d'une deuxième remise n'est pas permis (art. 155, 1°).",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q3",
    text: "Quel est le type d'usage résidentiel du bâtiment principal?",
    type: "choice",
    helpText: "Cette information détermine la superficie maximale autorisée pour la remise.",
    regulation: "Art. 155, 7° — Règlement de zonage",
    options: [
      {
        label: "Résidence unifamiliale — un seul logement (H1)",
        value: "h1",
        next: "q4_h1",
      },
      {
        label: "Immeuble à logements multiples (2 logements ou plus)",
        value: "multi",
        next: "q4_multi",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q4_h1",
    text: "Quelle est la superficie projetée de la remise?",
    type: "choice",
    helpText: "Mesurée hors-tout, en mètres carrés (longueur × largeur au niveau du sol).",
    regulation: "Art. 155, 7° — Règlement de zonage",
    options: [
      { label: "20 m² ou moins", value: "ok", next: "q5" },
      {
        label: "Plus de 20 m²",
        value: "over",
        next: "VOIE_REGULIERE",
        reason: "Pour une résidence unifamiliale (H1), la superficie maximale d'une remise est de 20 m². Votre projet dépasse ce seuil (art. 155, 7°).",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q4_multi",
    text: "Quelle est la superficie projetée de la remise (immeuble à logements multiples)?",
    type: "choice",
    helpText: "La superficie maximale est de 8 m² par logement, sans excéder 30 m² au total pour l'ensemble de la remise.",
    regulation: "Art. 155, 7° — Règlement de zonage",
    options: [
      {
        label: "≤ 8 m² par logement desservi ET ≤ 30 m² au total",
        value: "ok",
        next: "q5",
      },
      {
        label: "Dépasse 8 m² par logement ou dépasse 30 m² au total",
        value: "over",
        next: "VOIE_REGULIERE",
        reason: "Pour un immeuble à logements multiples, la remise est limitée à 8 m² par logement sans excéder 30 m² au total. Votre projet dépasse ces limites (art. 155, 7°).",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q5",
    text: "Quelle sera la hauteur maximale de la remise?",
    type: "choice",
    helpText: "La hauteur est mesurée depuis le niveau du sol naturel jusqu'au point le plus élevé de la toiture. La remise doit également être inférieure en hauteur au bâtiment principal.",
    regulation: "Art. 126, 3° et 4°; Art. 155, 3° — Règlement de zonage",
    options: [
      {
        label: "4,3 m ou moins ET inférieure à la hauteur du bâtiment principal",
        value: "ok",
        next: "q6",
      },
      {
        label: "Plus de 4,3 m ou égale/supérieure à la hauteur du bâtiment principal",
        value: "over",
        next: "VOIE_REGULIERE",
        reason: "La hauteur maximale d'une remise est fixée à 4,3 m (un étage) et ne peut excéder la hauteur du bâtiment principal. Votre projet dépasse l'une ou l'autre de ces limites (art. 126, 3°-4°; art. 155, 3°).",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q6",
    text: "La remise sera-t-elle implantée à au moins 2 m du bâtiment principal?",
    type: "choice",
    helpText: "Cette distance est mesurée entre la paroi extérieure de la remise et la paroi extérieure du bâtiment principal (maison).",
    regulation: "Art. 126, 5° — Règlement de zonage",
    options: [
      { label: "Oui, à 2 m ou plus du bâtiment principal", value: "ok", next: "q7" },
      {
        label: "Non, à moins de 2 m du bâtiment principal",
        value: "nok",
        next: "VOIE_REGULIERE",
        reason: "Une distance minimale de 2 m est requise entre la remise et le bâtiment principal. Votre projet ne respecte pas cette exigence (art. 126, 5°).",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q7",
    text: "Quelle sera la longueur du mur de façade avant (façade principale) de la remise?",
    type: "choice",
    helpText: "Le mur de façade avant est généralement le mur qui fait face à la résidence principale ou à l'allée d'accès.",
    regulation: "Art. 155, 5° — Règlement de zonage",
    options: [
      { label: "6 m ou moins", value: "ok", next: "q8" },
      {
        label: "Plus de 6 m",
        value: "over",
        next: "VOIE_REGULIERE",
        reason: "La longueur maximale du mur de façade avant d'une remise est de 6 m. Votre projet dépasse cette limite (art. 155, 5°).",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q8",
    text: "Les murs de la remise donnant sur les lignes de terrain comporteront-ils des ouvertures (fenêtres ou portes)?",
    type: "choice",
    helpText: "Cette réponse détermine le recul minimal requis par rapport aux limites de propriété. Un mur sans ouverture permet un recul réduit.",
    regulation: "Art. 155, 4° — Règlement de zonage",
    options: [
      {
        label: "Non, aucune ouverture sur les murs faisant face aux lignes de terrain",
        value: "closed",
        next: "q9_closed",
      },
      {
        label: "Oui, au moins une fenêtre ou porte sur un mur faisant face aux lignes de terrain",
        value: "open",
        next: "q9_open",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q9_closed",
    text: "Quel sera le recul minimal par rapport aux lignes de terrain latérales et arrière?",
    type: "choice",
    helpText: "Murs sans ouverture : recul minimal de 0,75 m requis.",
    regulation: "Art. 155, 4° a) — Règlement de zonage",
    options: [
      { label: "0,75 m ou plus", value: "ok", next: "VOIE_RAPIDE" },
      {
        label: "Moins de 0,75 m",
        value: "nok",
        next: "VOIE_REGULIERE",
        reason: "Pour un mur sans ouverture, le recul minimal par rapport aux lignes de terrain est de 0,75 m. Votre projet ne respecte pas cette exigence (art. 155, 4° a).",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
  {
    id: "q9_open",
    text: "Quel sera le recul minimal par rapport aux lignes de terrain latérales et arrière?",
    type: "choice",
    helpText: "Murs avec ouverture (fenêtre ou porte) : recul minimal de 1,5 m requis.",
    regulation: "Art. 155, 4° b) — Règlement de zonage",
    options: [
      { label: "1,5 m ou plus", value: "ok", next: "VOIE_RAPIDE" },
      {
        label: "Moins de 1,5 m",
        value: "nok",
        next: "VOIE_REGULIERE",
        reason: "Pour un mur comportant une ouverture (fenêtre ou porte), le recul minimal par rapport aux lignes de terrain est de 1,5 m. Votre projet ne respecte pas cette exigence (art. 155, 4° b).",
      },
      {
        label: "Je ne suis pas certain(e)",
        value: "uncertain",
        next: "BESOIN_AIDE",
        isHelp: true,
      },
    ],
  },
]

export default questions

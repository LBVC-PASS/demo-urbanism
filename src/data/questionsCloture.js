// Questions — Clôture (usage Habitation)
// Art. 140-147 — Règlement de zonage, Sainte-Marthe-sur-le-Lac

const questionsCloture = [
  {
    id: "cl_q1",
    text: "Dans quelle cour la clôture sera-t-elle implantée?",
    type: "choice",
    helpText: "La cour avant principale fait face à la rue principale. La cour avant secondaire est côté rue pour un terrain d'angle. Les cours latérales et arrière longent les limites intérieures du terrain.",
    regulation: "Art. 144, Tableau 9 — Règlement de zonage",
    options: [
      { label: "Cour avant principale (face à la rue principale)", value: "avant", next: "cl_q2_avant" },
      { label: "Cour avant secondaire (terrain d'angle, côté rue secondaire)", value: "avant_sec", next: "cl_q2_autre" },
      { label: "Cour latérale", value: "laterale", next: "cl_q2_autre" },
      { label: "Cour arrière", value: "arriere", next: "cl_q2_autre" },
    ],
  },

  // --- Branche cour avant ---
  {
    id: "cl_q2_avant",
    text: "Quelle sera la hauteur maximale de la clôture?",
    type: "choice",
    helpText: "En cour avant principale, la hauteur maximale autorisée est de 1,2 m. Mesurée depuis le niveau moyen du sol dans un rayon de 3 m.",
    regulation: "Art. 144, Tableau 9 — Règlement de zonage",
    options: [
      { label: "1,2 m ou moins", value: "ok", next: "cl_q3_avant" },
      {
        label: "Plus de 1,2 m",
        value: "over",
        next: "VOIE_REGULIERE",
        reason: "En cour avant principale, la hauteur maximale autorisée pour une clôture est de 1,2 m. Votre projet dépasse cette limite (art. 144, Tableau 9).",
      },
    ],
  },
  {
    id: "cl_q3_avant",
    text: "La clôture sera-t-elle implantée à au moins 1 m de la ligne de rue?",
    type: "choice",
    helpText: "En cour avant, la clôture doit être reculée d'au moins 1 m par rapport à la ligne de rue (limite entre votre terrain et l'emprise de la rue).",
    regulation: "Art. 144, Tableau 9 — Règlement de zonage",
    options: [
      { label: "Oui, à 1 m ou plus de la ligne de rue", value: "ok", next: "cl_q4" },
      {
        label: "Non, à moins de 1 m de la ligne de rue",
        value: "nok",
        next: "VOIE_REGULIERE",
        reason: "En cour avant principale, la clôture doit être implantée à au moins 1 m de la ligne de rue (art. 144, Tableau 9).",
      },
    ],
  },

  // --- Branche autres cours ---
  {
    id: "cl_q2_autre",
    text: "Quelle sera la hauteur maximale de la clôture?",
    type: "choice",
    helpText: "En cour avant secondaire, latérale et arrière, la hauteur maximale autorisée est de 1,8 m. Mesurée depuis le niveau moyen du sol dans un rayon de 3 m.",
    regulation: "Art. 144, Tableau 9 — Règlement de zonage",
    options: [
      { label: "1,8 m ou moins", value: "ok", next: "cl_q4" },
      {
        label: "Plus de 1,8 m",
        value: "over",
        next: "VOIE_REGULIERE",
        reason: "La hauteur maximale autorisée est de 1,8 m pour les cours avant secondaires, latérales et arrière. Votre projet dépasse cette limite (art. 144, Tableau 9).",
      },
    ],
  },

  // --- Questions communes ---
  {
    id: "cl_q4",
    text: "La clôture sera-t-elle construite à une distance suffisante des équipements d'utilité publique?",
    type: "choice",
    helpText: "Distance minimale requise : 1,5 m de tout équipement d'utilité publique municipal (ex. : regard d'égout, poteau électrique), et 2 m d'une borne fontaine (bouche d'incendie).",
    regulation: "Art. 143 — Règlement de zonage",
    options: [
      {
        label: "Oui, à plus de 1,5 m des équipements (et 2 m des bornes fontaines)",
        value: "ok",
        next: "cl_q5",
      },
      {
        label: "Non, ou je ne suis pas certain(e)",
        value: "nok",
        next: "VOIE_REGULIERE",
        reason: "Une distance minimale de 1,5 m de tout équipement d'utilité publique et de 2 m d'une borne fontaine est requise. Vérifiez l'emplacement des équipements avant de procéder (art. 143).",
      },
    ],
  },
  {
    id: "cl_q5",
    text: "Quel matériau sera utilisé pour la clôture?",
    type: "choice",
    helpText: "Certains matériaux sont expressément interdits par le règlement.",
    regulation: "Art. 145-146 — Règlement de zonage",
    options: [
      {
        label: "Bois peint, verni, teinté ou naturel rustique (perches)",
        value: "wood",
        next: "cl_q6",
      },
      {
        label: "Métal ornemental ou maille de chaîne (type « FROST »)",
        value: "metal",
        next: "cl_q6",
      },
      {
        label: "PVC, aluminium ou éléments façonnés prépeints",
        value: "pvc",
        next: "cl_q6",
      },
      {
        label: "Autre (broche à poulet, barbelés, contreplaqué, blocs béton non architecturaux, etc.)",
        value: "prohibited",
        next: "VOIE_REGULIERE",
        reason: "Le matériau prévu figure parmi les matériaux interdits (art. 146). Les matériaux prohibés incluent notamment : broche à poulet, fils barbelés, lattes de clôture à neige, panneaux de particules exposés, traverses de chemin de fer, et blocs de béton non architecturaux.",
      },
    ],
  },
  {
    id: "cl_q6",
    text: "La propriété est-elle adjacente au boulevard des Promenades?",
    type: "choice",
    helpText: "Si votre terrain borde directement le boulevard des Promenades, des restrictions particulières s'appliquent au type de clôture autorisé.",
    regulation: "Art. 147 — Règlement de zonage",
    options: [
      { label: "Non", value: "no", next: "VOIE_RAPIDE" },
      { label: "Oui, le terrain est adjacent au boulevard des Promenades", value: "yes", next: "cl_q7" },
    ],
  },
  {
    id: "cl_q7",
    text: "Pour les terrains adjacents au boulevard des Promenades — la clôture sera-t-elle en maille de chaîne (type FROST) ajourée à au moins 75 % et camouflée par une haie dense?",
    type: "choice",
    helpText: "Le long du boulevard des Promenades, seule la clôture en maille de chaîne (FROST) ouverte à ≥ 75 % est autorisée dans la cour adjacente, et elle doit être cachée par une haie dense. Hauteur max : 1,8 m.",
    regulation: "Art. 147 — Règlement de zonage",
    options: [
      {
        label: "Oui, maille de chaîne FROST (≥ 75 % ajourée) + haie dense, hauteur ≤ 1,8 m",
        value: "ok",
        next: "VOIE_RAPIDE",
      },
      {
        label: "Non, autre type de clôture ou sans haie de camouflage",
        value: "nok",
        next: "VOIE_REGULIERE",
        reason: "Le long du boulevard des Promenades, seule une clôture en maille de chaîne (type FROST) ajourée à au moins 75 % et camouflée par une haie dense est autorisée. Votre projet ne respecte pas ces conditions (art. 147).",
      },
    ],
  },
]

export default questionsCloture

// Questions — Climatisation / thermopompe
// Règlement R-1300-2, Ville de Sainte-Marthe-sur-le-Lac (données fictives — démonstration)

const questionsClimatisation = [
  {
    id: "clim_q1",
    text: "L'unité extérieure sera-t-elle installée sur la façade principale de la résidence (côté rue)?",
    type: "choice",
    helpText: "La façade principale est le côté de la résidence qui fait face à la voie publique.",
    regulation: "Art. 7.3.1 — Règlement R-1300-2",
    options: [
      { label: "Non, installation en façade latérale ou arrière", value: "no", next: "clim_q2" },
      {
        label: "Oui, installation en façade principale (côté rue)",
        value: "yes",
        next: "VOIE_REGULIERE",
        reason: "Les appareils de climatisation et thermopompes ne peuvent être installés sur la façade principale visible de la rue. Une dérogation doit être évaluée par l'urbaniste (art. 7.3.1, R-1300-2).",
      },
    ],
  },
  {
    id: "clim_q2",
    text: "Quelle sera la distance minimale entre l'unité extérieure et la ligne de propriété voisine la plus proche?",
    type: "choice",
    helpText: "Mesurée depuis le boîtier de l'appareil (compresseur), non compris les protections ou grilles.",
    regulation: "Art. 7.3.2 — Règlement R-1300-2",
    options: [
      { label: "1 m ou plus", value: "sufficient", next: "clim_q3" },
      {
        label: "Moins de 1 m",
        value: "insufficient",
        next: "VOIE_REGULIERE",
        reason: "L'unité extérieure doit être placée à au moins 1 m de la ligne de propriété pour limiter les nuisances sonores chez le voisin (art. 7.3.2, R-1300-2).",
      },
    ],
  },
  {
    id: "clim_q3",
    text: "L'appareil sera-t-il installé dans une zone de contraintes naturelles ou à moins de 15 m d'un cours d'eau?",
    type: "choice",
    helpText: "Consultez la carte des zones à risque sur le portail citoyen si vous avez un doute.",
    regulation: "Politique de protection des rives — PPRLPI",
    options: [
      { label: "Non", value: "no", next: "clim_q4" },
      {
        label: "Oui, ou je ne suis pas certain(e)",
        value: "yes",
        next: "VOIE_REGULIERE",
        reason: "Tout équipement installé en zone de contraintes naturelles ou à proximité d'un cours d'eau requiert une analyse complète et peut nécessiter une autorisation du gouvernement provincial.",
      },
    ],
  },
  {
    id: "clim_q4",
    text: "Selon la fiche technique du fabricant, le niveau sonore de l'appareil est-il de 55 dB(A) ou moins, mesuré à 1 mètre?",
    type: "choice",
    helpText: "Cette information se trouve dans la fiche technique ou sur le site du fabricant. En cas de doute, vérifiez auprès de votre entrepreneur.",
    regulation: "Art. 9.1.4 — Règlement sur le bruit ambiant",
    options: [
      { label: "Oui, 55 dB(A) ou moins", value: "compliant", next: "clim_q5" },
      {
        label: "Non, ou information inconnue",
        value: "unknown",
        next: "VOIE_REGULIERE",
        reason: "Le niveau sonore de l'appareil doit être confirmé à 55 dB(A) ou moins pour éviter des nuisances sonores aux voisins. Une fiche technique doit être soumise pour évaluation (art. 9.1.4).",
      },
    ],
  },
  {
    id: "clim_q5",
    text: "L'installation sera-t-elle réalisée par un entrepreneur détenteur d'une licence valide de la Régie du bâtiment du Québec (RBQ)?",
    type: "choice",
    helpText: "Une licence RBQ valide est obligatoire pour tout travail de mécanique du bâtiment au Québec. Vous pouvez vérifier la licence de votre entrepreneur sur le site de la RBQ.",
    regulation: "Loi sur le bâtiment, L.R.Q., c. B-1.1",
    options: [
      { label: "Oui, entrepreneur licencié RBQ", value: "yes", next: "VOIE_RAPIDE" },
      {
        label: "Non, ou installation par le propriétaire lui-même",
        value: "no",
        next: "VOIE_REGULIERE",
        reason: "Les travaux de mécanique du bâtiment doivent être réalisés par un entrepreneur titulaire d'une licence RBQ valide. L'auto-installation n'est pas permise pour ce type d'appareil (Loi sur le bâtiment).",
      },
    ],
  },
]

export default questionsClimatisation

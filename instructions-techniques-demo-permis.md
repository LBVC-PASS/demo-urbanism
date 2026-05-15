# Instructions techniques — Démo : Outil de déclaration guidée de travaux

## Ville de Sainte-Marthe-sur-le-Lac

> Ce document est un briefing technique autonome destiné à Claude Code pour la construction d’un prototype interactif. Le prototype illustre le fonctionnement d’un outil de déclaration préalable guidée dans le cadre d’une réforme du processus de permis municipal.

-----

## Contexte fonctionnel

La Ville de Sainte-Marthe-sur-le-Lac souhaite moderniser son processus de permis en remplaçant le traitement séquentiel unique par un système de triage basé sur le risque. L’outil de déclaration guidée est le cœur de ce système : il pose des questions conditionnelles au citoyen, compare les réponses aux exigences réglementaires en temps réel, et oriente automatiquement le dossier vers une voie rapide (5 jours ouvrables) ou une voie régulière (processus complet).

Le prototype démontre ce concept pour un type de travaux spécifique. Il est autonome et non connecté aux systèmes de la Ville.

-----

## Stack technique

- **React + Vite**
- **TailwindCSS** pour le style
- **Déploiement : GitHub Pages**
- Langue de l’interface : **français**

-----

## Architecture de fichiers

```
smsll-permis-demo/
├── public/
│   └── logo-smsll.png          # Logo optionnel
├── src/
│   ├── data/
│   │   └── questions.js        # Arbre de questions (fourni séparément)
│   ├── components/
│   │   ├── WizardStep.jsx       # Affichage d'une question + options
│   │   ├── ProgressBar.jsx      # Indicateur de progression
│   │   ├── ResultScreen.jsx     # Résultat : voie rapide ou voie régulière
│   │   └── Declaration.jsx      # Attestation finale avec case à cocher
│   ├── App.jsx                  # Contrôleur principal du wizard
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

-----

## Structure des données — questions.js

Chaque question est un objet JavaScript :

```javascript
{
  id: "q1",
  text: "Quelle est la superficie au sol de la construction projetée?",
  type: "choice",        // "choice" | "numeric" | "boolean"
  helpText: "Mesurée hors-tout, en mètres carrés.",  // optionnel
  regulation: "Art. 4.2.1 — Règlement R-1300-2",    // affiché au citoyen
  options: [
    { label: "Moins de 15 m²", value: "small", next: "q2" },
    { label: "Entre 15 m² et 30 m²", value: "medium", next: "q3" },
    { label: "Plus de 30 m²", value: "large", next: "VOIE_REGULIERE",
      reason: "Les constructions de plus de 30 m² nécessitent une analyse complète." }
  ]
}
```

**Valeurs spéciales pour `next` :**

- `"VOIE_RAPIDE"` → le wizard se termine avec un résultat positif
- `"VOIE_REGULIERE"` → le wizard se termine avec une orientation vers le processus complet, et le champ `reason` de l’option est affiché au citoyen

**Note :** Si une seule réponse dans le parcours déclenche `VOIE_REGULIERE`, le résultat final est toujours `VOIE_REGULIERE`, même si les réponses suivantes auraient mené à `VOIE_RAPIDE`.

-----

## Logique du wizard (App.jsx)

```
État : {
  currentQuestionId: string,
  answers: [ { questionId, selectedOption } ],
  result: null | "VOIE_RAPIDE" | "VOIE_REGULIERE",
  triggerReason: string | null   // raison du déclenchement voie régulière
}

Flux :
1. Afficher la question courante (WizardStep)
2. Citoyen sélectionne une option
3. Enregistrer la réponse dans answers[]
4. Si next === "VOIE_REGULIERE" → enregistrer reason, passer à ResultScreen
5. Si next === "VOIE_RAPIDE" et c'est la dernière question → passer à ResultScreen
6. Sinon → charger la prochaine question par id
```

-----

## Composants

### WizardStep.jsx

- Affiche le texte de la question
- Affiche le `helpText` si présent (style discret, italique)
- Affiche la référence réglementaire (`regulation`) en bas, style secondaire
- Affiche les options comme boutons cliquables (un seul choix)
- Bouton « Retour » si ce n’est pas la première question

### ProgressBar.jsx

- Barre de progression basée sur `(index question actuelle / nombre total estimé de questions) * 100`
- Afficher aussi le numéro : « Question 3 sur 7 »

### ResultScreen.jsx

**Si VOIE_RAPIDE :**

- Bandeau vert ✓ « Votre projet est admissible à la voie rapide »
- Délai affiché : « Délai estimé : 5 jours ouvrables »
- Résumé des réponses soumises (question + réponse choisie)
- Références réglementaires applicables (extraites des questions)
- Bouton « Continuer vers la déclaration »

**Si VOIE_REGULIERE :**

- Bandeau orange → « Votre projet nécessite une analyse complète »
- Afficher la raison (`triggerReason`)
- Résumé des réponses
- Message : « Veuillez soumettre une demande de permis complète via le portail citoyen. »
- Lien fictif : `citoyen.vsmsll.ca`

### Declaration.jsx

*(Affiché uniquement après VOIE_RAPIDE)*

Champs à saisir :

- Prénom et nom
- Adresse du projet
- Date de début prévue des travaux

Texte de l’attestation (afficher en encadré) :

> *« Je soussigné(e) déclare que les informations fournies dans la présente déclaration sont exactes et complètes à ma connaissance. Je reconnais que toute fausse déclaration, ou la réalisation de travaux non conformes aux paramètres déclarés, constitue une infraction au règlement municipal sur les permis et certificats et est passible d’amendes et de mesures de remise en conformité aux frais du propriétaire. »*

Case à cocher obligatoire : « J’ai lu et j’accepte les conditions ci-dessus »

Bouton « Soumettre la déclaration » → affiche un écran de confirmation fictif :

> « Votre déclaration a été enregistrée. Numéro de référence : DEMO-2026-XXXX. Vous recevrez une confirmation par courriel dans les 5 jours ouvrables. »

-----

## Design

- Palette : bleu municipal (#1B4F8A) + blanc + gris clair
- Police : sobre et lisible (ex. : Source Sans Pro ou Nunito via Google Fonts)
- Interface responsive (mobile first — les citoyens utilisent leur téléphone)
- Logo ou nom de la Ville en en-tête : « Ville de Sainte-Marthe-sur-le-Lac »
- Sous-titre : « Déclaration préalable de travaux — Prototype »
- Bannière discrète en bas : « Cet outil est un prototype de démonstration. Il ne constitue pas une demande officielle. »

-----

## Déploiement GitHub Pages

```bash
# 1. Initialiser le projet
npm create vite@latest smsll-permis-demo -- --template react
cd smsll-permis-demo
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 2. Installer gh-pages
npm install gh-pages --save-dev

# 3. Dans vite.config.js, ajouter :
# base: '/smsll-permis-demo/'

# 4. Dans package.json, ajouter dans "scripts" :
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# 5. Déployer
npm run deploy
```

Le site sera accessible à :
`https://<username>.github.io/smsll-permis-demo`

-----

## Données réglementaires (à fournir séparément)

Pour générer le fichier `questions.js` complet, fournir à Claude :

1. Le ou les **articles du règlement de zonage** (R-1300 ou équivalent) applicables au type de travaux choisi
1. Les **paramètres mesurables** qui déterminent la conformité : superficie maximale, hauteur maximale, marges de recul, zone d’application, usage permis
1. Les **critères qui déclenchent obligatoirement** une analyse CCU ou une voie régulière
1. Le **type de projet** à démontrer (ex. : remise/cabanon, clôture, patio/terrasse, pergola)

Une fois ces données fournies, Claude génère le fichier `questions.js` complet et peut compléter ou ajuster tous les composants en conséquence.
import { useState } from 'react'

function generateRef() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `DEMO-2026-${num}`
}

export default function Declaration({ onRestart }) {
  const [form, setForm] = useState({ prenom: '', nom: '', adresse: '', dateDebut: '' })
  const [accepted, setAccepted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ref] = useState(generateRef)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function isValid() {
    return form.prenom && form.nom && form.adresse && form.dateDebut && accepted
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (isValid()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card text-center space-y-4">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-bold text-green-700">Déclaration enregistrée</h2>
        <div className="bg-green-50 border border-green-300 rounded-xl p-4 text-sm text-green-800">
          <p>Numéro de référence : <span className="font-bold text-lg">{ref}</span></p>
          <p className="mt-2 text-gray-600">
            Vous recevrez une confirmation par courriel dans les 5 jours ouvrables.
          </p>
        </div>
        <p className="text-xs text-gray-400 italic">
          Ceci est une démonstration. Aucune donnée n'a été transmise à la Ville.
        </p>
        <button onClick={onRestart} className="btn-secondary mt-2">
          Recommencer la démonstration
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Déclaration préalable</h2>
        <p className="text-sm text-gray-500 mb-6">Complétez les champs ci-dessous pour finaliser votre déclaration.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="prenom">
                Prénom *
              </label>
              <input
                id="prenom"
                name="prenom"
                type="text"
                value={form.prenom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:border-transparent"
                placeholder="Ex. : Marie"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="nom">
                Nom *
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                value={form.nom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:border-transparent"
                placeholder="Ex. : Tremblay"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="adresse">
              Adresse du projet *
            </label>
            <input
              id="adresse"
              name="adresse"
              type="text"
              value={form.adresse}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:border-transparent"
              placeholder="Ex. : 123, rue des Érables, Sainte-Marthe-sur-le-Lac"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="dateDebut">
              Date de début prévue des travaux *
            </label>
            <input
              id="dateDebut"
              name="dateDebut"
              type="date"
              value={form.dateDebut}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:border-transparent"
            />
          </div>

          {/* Attestation */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-2">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              « Je soussigné(e) déclare que les informations fournies dans la présente déclaration sont exactes et complètes à ma connaissance. Je reconnais que toute fausse déclaration, ou la réalisation de travaux non conformes aux paramètres déclarés, constitue une infraction au règlement municipal sur les permis et certificats et est passible d'amendes et de mesures de remise en conformité aux frais du propriétaire. »
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 w-5 h-5 accent-[#1B4F8A] cursor-pointer flex-shrink-0"
            />
            <span className="text-sm font-medium text-gray-700">
              J'ai lu et j'accepte les conditions ci-dessus *
            </span>
          </label>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!isValid()}
              className="btn-primary"
            >
              Soumettre la déclaration
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ResultScreen({ result, triggerReason, answers, questions, onContinue }) {
  const isRapide = result === 'VOIE_RAPIDE'

  const answeredQuestions = answers.map(({ questionId, selectedOption }) => {
    const q = questions.find((q) => q.id === questionId)
    return { question: q, selectedOption }
  })

  const regulations = [
    ...new Set(
      answeredQuestions
        .filter(({ question }) => question?.regulation)
        .map(({ question }) => question.regulation)
    ),
  ]

  return (
    <div className="space-y-5">
      {/* Bandeau résultat */}
      <div
        className={`rounded-2xl p-6 border-2 ${
          isRapide
            ? 'bg-green-50 border-green-400'
            : 'bg-orange-50 border-orange-400'
        }`}
      >
        <div className="flex items-start gap-4">
          <span className="text-3xl mt-0.5">{isRapide ? '✅' : '⚠️'}</span>
          <div>
            <h2 className={`text-xl font-bold mb-1 ${isRapide ? 'text-green-800' : 'text-orange-800'}`}>
              {isRapide
                ? 'Votre projet est admissible à la voie rapide'
                : 'Votre projet nécessite une analyse complète'}
            </h2>
            {isRapide ? (
              <p className="text-green-700 font-semibold">
                Délai estimé : <span className="font-bold">5 jours ouvrables</span>
              </p>
            ) : (
              <p className="text-orange-700 text-sm mt-1">{triggerReason}</p>
            )}
          </div>
        </div>
      </div>

      {/* Résumé des réponses */}
      <div className="card">
        <h3 className="font-bold text-gray-800 mb-4">Résumé de vos réponses</h3>
        <ul className="divide-y divide-gray-100">
          {answeredQuestions.map(({ question, selectedOption }, i) => (
            <li key={i} className="py-3">
              <p className="text-xs text-gray-400 mb-0.5">{question?.regulation}</p>
              <p className="text-sm font-semibold text-gray-700">{question?.text}</p>
              <p className="text-sm text-[#1B4F8A] font-medium mt-1">
                → {selectedOption.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Références réglementaires / message portail */}
      {isRapide ? (
        <div className="card">
          <h3 className="font-bold text-gray-800 mb-3">Références réglementaires applicables</h3>
          <ul className="space-y-1">
            {regulations.map((ref, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-[#1B4F8A] font-bold mt-0.5">·</span>
                {ref}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="card border-orange-200 bg-orange-50">
          <p className="text-sm font-semibold text-gray-800 mb-2">Prochaine étape</p>
          <p className="text-gray-700 text-sm mb-4">
            Votre projet nécessite une analyse par un professionnel. Veuillez vous présenter ou communiquer avec le service responsable :
          </p>
          <div className="bg-white rounded-xl border border-orange-200 p-4 space-y-1">
            <p className="font-bold text-gray-900 text-sm">
              Service de l'Aménagement du territoire et du développement durable
            </p>
            <p className="text-sm text-gray-600">Ville de Sainte-Marthe-sur-le-Lac</p>
            <p className="text-sm text-gray-600">3060, boul. des Promenades</p>
            <p className="text-sm text-gray-600">Sainte-Marthe-sur-le-Lac (Québec)  J0N 1P0</p>
          </div>
        </div>
      )}

      {isRapide && (
        <div className="flex justify-end">
          <button onClick={onContinue} className="btn-primary">
            Continuer vers la déclaration →
          </button>
        </div>
      )}
    </div>
  )
}

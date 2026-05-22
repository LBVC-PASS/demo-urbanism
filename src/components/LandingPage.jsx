const permits = [
  {
    id: 'cabanon',
    icon: '🏚️',
    title: 'Cabanon / abri de jardin',
    description: 'Constructions accessoires détachées ≤ 30 m²',
    available: true,
  },
  {
    id: 'climatisation',
    icon: '❄️',
    title: 'Climatisation / thermopompe',
    description: 'Installation d\'une unité extérieure de climatisation',
    available: true,
  },
  {
    id: 'cloture',
    icon: '🚧',
    title: 'Clôture',
    description: 'Clôtures, murets et haies de séparation',
    available: true,
  },
  {
    id: 'patio',
    icon: '🪵',
    title: 'Patio / terrasse',
    description: 'Patios, terrasses et balcons extérieurs',
    available: false,
  },
  {
    id: 'piscine',
    icon: '🏊',
    title: 'Piscine',
    description: 'Piscines creusées et hors-terre',
    available: false,
  },
  {
    id: 'pergola',
    icon: '⛺',
    title: 'Pergola / gazebo',
    description: 'Structures de jardin couvertes ou semi-couvertes',
    available: false,
  },
]

export default function LandingPage({ onSelect }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
          Quel type de travaux planifiez-vous?
        </h2>
        <p className="text-gray-500 text-sm">
          Sélectionnez la catégorie correspondant à votre projet pour démarrer votre déclaration préalable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {permits.map((permit) => (
          <button
            key={permit.id}
            onClick={() => permit.available && onSelect(permit.id)}
            disabled={!permit.available}
            className={`text-left rounded-2xl border-2 p-5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2
              ${permit.available
                ? 'border-gray-200 bg-white hover:border-[#1B4F8A] hover:shadow-md hover:bg-blue-50 cursor-pointer'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
              }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{permit.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-gray-900 text-base leading-tight">
                    {permit.title}
                  </span>
                  {permit.available ? (
                    <span className="text-xs font-semibold bg-[#1B4F8A] text-white px-2 py-0.5 rounded-full">
                      Disponible
                    </span>
                  ) : (
                    <span className="text-xs font-semibold bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                      Bientôt
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-snug">
                  {permit.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

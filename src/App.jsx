import { useState } from 'react'
import questionsCabanon from './data/questions.js'
import questionsClimatisation from './data/questionsClimatisation.js'
import LandingPage from './components/LandingPage.jsx'
import WizardStep from './components/WizardStep.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import Declaration from './components/Declaration.jsx'

const PERMIT_CONFIG = {
  cabanon: {
    questions: questionsCabanon,
    label: 'Cabanon / abri de jardin',
  },
  climatisation: {
    questions: questionsClimatisation,
    label: 'Climatisation / thermopompe',
  },
}

function makeInitialWizardState(questions) {
  return {
    currentQuestionId: questions[0].id,
    answers: [],
    result: null,
    triggerReason: null,
    showDeclaration: false,
  }
}

export default function App() {
  const [selectedPermit, setSelectedPermit] = useState(null)
  const [wizardState, setWizardState] = useState(null)

  function handleSelectPermit(permitId) {
    const config = PERMIT_CONFIG[permitId]
    setSelectedPermit(permitId)
    setWizardState(makeInitialWizardState(config.questions))
  }

  function handleBack() {
    const questions = PERMIT_CONFIG[selectedPermit].questions
    if (wizardState.answers.length === 0) return
    const prev = wizardState.answers[wizardState.answers.length - 1]
    setWizardState({
      ...wizardState,
      currentQuestionId: prev.questionId,
      answers: wizardState.answers.slice(0, -1),
      result: null,
      triggerReason: null,
    })
  }

  function handleAnswer(option) {
    const questions = PERMIT_CONFIG[selectedPermit].questions
    const currentQuestion = questions.find((q) => q.id === wizardState.currentQuestionId)
    const newAnswer = { questionId: currentQuestion.id, selectedOption: option }
    const newAnswers = [...wizardState.answers, newAnswer]

    if (option.next === 'VOIE_REGULIERE') {
      setWizardState({
        ...wizardState,
        answers: newAnswers,
        result: 'VOIE_REGULIERE',
        triggerReason: option.reason || null,
        currentQuestionId: null,
      })
    } else if (option.next === 'VOIE_RAPIDE') {
      setWizardState({
        ...wizardState,
        answers: newAnswers,
        result: 'VOIE_RAPIDE',
        currentQuestionId: null,
      })
    } else {
      setWizardState({
        ...wizardState,
        currentQuestionId: option.next,
        answers: newAnswers,
      })
    }
  }

  function handleContinueToDeclaration() {
    setWizardState((s) => ({ ...s, showDeclaration: true }))
  }

  function handleRestart() {
    setSelectedPermit(null)
    setWizardState(null)
  }

  const config = selectedPermit ? PERMIT_CONFIG[selectedPermit] : null
  const questions = config?.questions ?? []
  const currentQuestion = questions.find((q) => q.id === wizardState?.currentQuestionId)
  const questionIndex = currentQuestion ? questions.findIndex((q) => q.id === currentQuestion.id) : -1

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* En-tête */}
      <header className="bg-[#1B4F8A] text-white shadow-md">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-0.5">
            Ville de Sainte-Marthe-sur-le-Lac
          </p>
          <h1 className="text-lg font-extrabold leading-tight">
            Déclaration préalable de travaux
          </h1>
          {config && (
            <p className="text-sm text-blue-200 mt-0.5">
              {config.label}
            </p>
          )}
          {!config && (
            <p className="text-sm text-blue-200 mt-0.5">Prototype</p>
          )}
        </div>
      </header>

      {/* Fil d'Ariane */}
      {selectedPermit && (
        <div className="max-w-2xl w-full mx-auto px-4 pt-4">
          <button
            onClick={handleRestart}
            className="text-sm text-[#1B4F8A] font-semibold hover:underline flex items-center gap-1"
          >
            ← Choisir un autre type de travaux
          </button>
        </div>
      )}

      {/* Contenu principal */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6">
        {!selectedPermit && (
          <LandingPage onSelect={handleSelectPermit} />
        )}

        {selectedPermit && wizardState && !wizardState.result && currentQuestion && (
          <WizardStep
            question={currentQuestion}
            questionIndex={questionIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}

        {selectedPermit && wizardState?.result && !wizardState.showDeclaration && (
          <ResultScreen
            result={wizardState.result}
            triggerReason={wizardState.triggerReason}
            answers={wizardState.answers}
            questions={questions}
            onContinue={handleContinueToDeclaration}
          />
        )}

        {selectedPermit && wizardState?.showDeclaration && (
          <Declaration onRestart={handleRestart} />
        )}
      </main>

      {/* Pied de page */}
      <footer className="bg-gray-800 text-gray-300 text-center text-xs py-3 px-4">
        Cet outil est un prototype de démonstration. Il ne constitue pas une demande officielle.
      </footer>
    </div>
  )
}

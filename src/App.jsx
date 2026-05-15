import { useState } from 'react'
import questions from './data/questions.js'
import WizardStep from './components/WizardStep.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import Declaration from './components/Declaration.jsx'

const INITIAL_STATE = {
  currentQuestionId: questions[0].id,
  answers: [],
  result: null,
  triggerReason: null,
  showDeclaration: false,
}

function getQuestionIndex(id) {
  return questions.findIndex((q) => q.id === id)
}

export default function App() {
  const [state, setState] = useState(INITIAL_STATE)

  function handleAnswer(option) {
    const currentQuestion = questions.find((q) => q.id === state.currentQuestionId)
    const newAnswer = { questionId: currentQuestion.id, selectedOption: option }
    const newAnswers = [...state.answers, newAnswer]

    if (option.next === 'VOIE_REGULIERE') {
      setState({
        ...state,
        answers: newAnswers,
        result: 'VOIE_REGULIERE',
        triggerReason: option.reason || null,
        currentQuestionId: null,
      })
    } else if (option.next === 'VOIE_RAPIDE') {
      setState({
        ...state,
        answers: newAnswers,
        result: 'VOIE_RAPIDE',
        currentQuestionId: null,
      })
    } else {
      setState({
        ...state,
        currentQuestionId: option.next,
        answers: newAnswers,
      })
    }
  }

  function handleBack() {
    if (state.answers.length === 0) return
    const prev = state.answers[state.answers.length - 1]
    setState({
      ...state,
      currentQuestionId: prev.questionId,
      answers: state.answers.slice(0, -1),
      result: null,
      triggerReason: null,
    })
  }

  function handleContinueToDeclaration() {
    setState((s) => ({ ...s, showDeclaration: true }))
  }

  function handleRestart() {
    setState(INITIAL_STATE)
  }

  const currentQuestion = questions.find((q) => q.id === state.currentQuestionId)
  const questionIndex = currentQuestion ? getQuestionIndex(currentQuestion.id) : -1

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
          <p className="text-sm text-blue-200 mt-0.5">Prototype — Cabanon / abri de jardin</p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6">
        {!state.result && currentQuestion && (
          <WizardStep
            question={currentQuestion}
            questionIndex={questionIndex}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onBack={handleBack}
          />
        )}

        {state.result && !state.showDeclaration && (
          <ResultScreen
            result={state.result}
            triggerReason={state.triggerReason}
            answers={state.answers}
            questions={questions}
            onContinue={handleContinueToDeclaration}
          />
        )}

        {state.showDeclaration && (
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

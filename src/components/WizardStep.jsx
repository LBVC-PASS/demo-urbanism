import { useState } from 'react'
import ProgressBar from './ProgressBar.jsx'

export default function WizardStep({ question, questionIndex, totalQuestions, onAnswer, onBack }) {
  const [selected, setSelected] = useState(null)

  function handleSelect(option) {
    setSelected(option.value)
    setTimeout(() => onAnswer(option), 200)
  }

  return (
    <div className="card">
      <ProgressBar current={questionIndex + 1} total={totalQuestions} />

      <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
        {question.text}
      </h2>

      {question.helpText && (
        <p className="text-sm text-gray-500 italic mb-5">{question.helpText}</p>
      )}

      <div className="mb-6">
        <div className="space-y-3">
          {question.options.filter(o => !o.isHelp).map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`option-btn ${selected === option.value ? 'option-btn-selected' : ''}`}
            >
              <span className="flex items-center gap-3">
                <span className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selected === option.value
                    ? 'border-[#1B4F8A] bg-[#1B4F8A]'
                    : 'border-gray-300'
                }`}>
                  {selected === option.value && (
                    <span className="w-2 h-2 rounded-full bg-white block" />
                  )}
                </span>
                {option.label}
              </span>
            </button>
          ))}
        </div>
        {question.options.filter(o => o.isHelp).map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option)}
            className="w-full mt-4 text-left px-4 py-3 rounded-xl border border-dashed border-gray-300 hover:border-[#1B4F8A] hover:bg-blue-50 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2"
          >
            <span className="flex items-center gap-2 text-sm text-gray-500 italic">
              <span>💬</span>
              {option.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        {questionIndex > 0 ? (
          <button onClick={onBack} className="btn-secondary text-sm px-4 py-2">
            ← Retour
          </button>
        ) : (
          <div />
        )}
        {question.regulation && (
          <p className="text-xs text-gray-400 text-right max-w-xs">{question.regulation}</p>
        )}
      </div>
    </div>
  )
}

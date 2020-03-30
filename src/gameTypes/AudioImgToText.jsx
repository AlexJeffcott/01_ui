import React from 'react'
import { imgs } from '../assets'

const getText = (_lang, _answer) => {
  switch (_lang) {
    case 'en':
      return _answer.text_en
    case 'it':
      return _answer.text_it
    case 'de':
      return _answer.text_de
    default:
      return console.error(`value of _lang is: ${_lang}`)
  }
}

export default function TextToAudioImg ({ answered, q, answers, selected, handleSetSelected, handlePlayAudio, lang }) {
  React.useEffect(() => handlePlayAudio(q.id, handleSetSelected, lang), [lang, q])
  return (
    <React.Fragment>
      <img
        onClick={() => handlePlayAudio(q.id, handleSetSelected, lang)}
        className="qIcon"
        src={imgs[q.imgId]}
        alt={q.imgId}
      />
      <div className="answerWrapperTextToAudioImg">
        {answers.map((answer, k) => (
          <div
            key={`${answer.id}_${k}`}
            onClick={() => handleSetSelected(answer.id)}
            className={`
                            clickable
                            ${!answered && selected === answer.id ? 'selected' : ''}
                            ${answered && selected === answer.id ? answered : ''}
                        `}
          >
            <h2>{getText(lang, answer)}</h2>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

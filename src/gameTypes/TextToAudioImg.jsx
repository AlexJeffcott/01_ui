import React from 'react'
import { imgs } from '../assets'

const getText = (_lang, _q) => {
  if (!_q) return ''
  switch (_lang) {
    case 'en':
      return _q.text_en
    case 'it':
      return _q.text_it
    case 'de':
      return _q.text_de
    default:
      return console.error(`value of _lang is: ${_lang}`)
  }
}

export default function TextToAudioImg ({ answered, q, answers, selected, handleSetSelected, handlePlayAudio, lang }) {
  return (
    <React.Fragment>
      <div className={`questionText ${answered || ''}`}>{getText(lang, q)}</div>
      <div className="answerWrapper">
        {answers.map((answer, k) => (
          <div
            key={`${answer.id}_${k}`}
            className={`
                clickable
                ${!answered && selected === answer.id ? 'selected' : ''}
                ${answered && selected === answer.id ? answered : ''}
           `}
          >
            <img
              onClick={() => handlePlayAudio(answer.id, handleSetSelected, lang)}
              className="icon"
              src={imgs[answer.imgId]}
              alt={answer.imgId}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

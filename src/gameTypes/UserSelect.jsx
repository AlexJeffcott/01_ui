import React from 'react'
import { imgs } from '../assets'

const getText = _lang => {
  switch (_lang) {
    case 'en':
      return 'choose your animal!'
    case 'it':
      return 'scegli il tuo animale!'
    case 'de':
      return 'Wähle dein Tier!'
    default:
      return console.error(`value of _lang is: ${_lang}`)
  }
}

// eslint-disable-next-line react/prop-types
export default function UserSelect({ selected, handleSetSelected, lang }) {
  return (
    <React.Fragment>
      <h1>{getText(lang)}</h1>
      <div className="answerWrapper">
        <div className={selected === 'cat' ? 'selected' : ''}>
          <img onClick={() => handleSetSelected('cat')} className="icon clickable" src={imgs.cat} alt="cat" />
        </div>
        <div className={selected === 'monkey' ? 'selected' : ''}>
          <img onClick={() => handleSetSelected('monkey')} className="icon clickable" src={imgs.monkey} alt="monkey" />
        </div>
        <div className={selected === 'dog' ? 'selected' : ''}>
          <img onClick={() => handleSetSelected('dog')} className="icon clickable" src={imgs.dog} alt="dog" />
        </div>
        <div className={selected === 'fox' ? 'selected' : ''}>
          <img onClick={() => handleSetSelected('fox')} className="icon clickable" src={imgs.fox} alt="fox" />
        </div>
      </div>
    </React.Fragment>
  )
}

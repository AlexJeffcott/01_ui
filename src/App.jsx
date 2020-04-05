import React from 'react'
import './App.css'
import { audio } from './assets'
import { UserSelect, TextToAudioImg, AudioImgToText } from './gameTypes'

const App = ({ states, dispatchers, actionDefs, api }) => {
  // eslint-disable-next-line no-unused-vars
  const { getQs, getAnswers } = api

  const { shuffle } = states.envsDepsMocksState.deps
  const { settingsDispatcher } = dispatchers
  const { lang, gameType, userName, course } = states.settingsState
  const {
    setGameTypeUserSelect,
    setGameTypeTextToAudioImg,
    setUserNameToCat,
    setUserNameToFox,
    setUserNameToDog,
    setUserNameToMonkey
  } = actionDefs.settingsActionDefs

  const [qs, setQs] = React.useState([])
  const [q, setQ] = React.useState({})
  const [answers, setAnswers] = React.useState([])
  const [qIndex, setQIndex] = React.useState(0)
  const [selected, setSelected] = React.useState(null)
  const [answered, setAnswered] = React.useState('')
  const [scores, setScores] = React.useState({})

  React.useEffect(() => {
    const items = localStorage.getItem(userName)
    if (items) {
      setScores(JSON.parse(items))
    } else {
      setScores({})
    }
  }, [userName])

  React.useEffect(() => setQs(getQs(10, course)), [getQs])

  React.useEffect(() => setQ(qs[qIndex]), [qIndex, qs])

  React.useEffect(() => {
    const createAnswers = () => {
      const _answers = shuffle([q, ...shuffle(qs.filter(_q => _q.id !== q.id)).slice(0, 3)])
      setAnswers(_answers)
    }
    if (q) createAnswers()
  }, [q, shuffle])

  const handleSubmit = _selected => {
    if (!_selected) return undefined

    const goToNextQ = () => {
      if (qIndex === qs.length - 1) {
        settingsDispatcher(setGameTypeUserSelect)
        setAnswered('')
        setSelected(null)
        setQIndex(0)
      } else {
        setAnswered('')
        setSelected(null)
        setQIndex(qIndex + 1)
      }
    }

    if (gameType === 'userSelect') {
      if (_selected === 'cat') settingsDispatcher(setUserNameToCat)
      if (_selected === 'fox') settingsDispatcher(setUserNameToFox)
      if (_selected === 'dog') settingsDispatcher(setUserNameToDog)
      if (_selected === 'monkey') settingsDispatcher(setUserNameToMonkey)
      setTimeout(() => {
        goToNextQ()
        settingsDispatcher(setGameTypeTextToAudioImg)
      }, 1000)
    } else if (_selected === q.id) {
      const newScores = {
        ...scores,
        [q.id]: scores[q.id] ? scores[q.id] + 1 : 1
      }
      setScores(newScores)
      localStorage.setItem(userName, JSON.stringify(newScores))
      handlePlayAudio('id_great', () => {}, lang)
      setAnswered('correct')
      setTimeout(goToNextQ, 2000)
    } else {
      const newScores = {
        ...scores,
        [q.id]: scores[q.id] ? scores[q.id] - 1 : -1
      }
      setScores(newScores)
      setAnswered('incorrect')
      localStorage.setItem(userName, JSON.stringify(newScores))
      setTimeout(goToNextQ, 2000)
    }
  }

  const handleSetSelected = _selected => {
    if (_selected === selected) {
      // setSelected(null)
      return undefined
    } else {
      setSelected(_selected)
    }
  }

  const handlePlayAudio = (_id, cb, _lang) => {
    // if (_id !== selected) {
    //   const src = audio[getAudioId(_lang, _id)]
    //   const audioElement = src && new Audio(src)
    //   audioElement.play().then(() => cb(_id))
    // } else {
    //   cb(_id)
    // }

    const src = audio[getAudioId(_lang, _id)]
    const audioElement = src && new Audio(src)
    audioElement.play().then(() => cb(_id))
  }

  const getAudioId = React.useCallback((_lang, answerId) => {
    switch (_lang) {
      case 'en':
        return `${answerId}_en`
      case 'it':
        return `${answerId}_it`
      case 'de':
        return `${answerId}_de`
      default:
        return console.error(`value of _lang is: ${_lang}`)
    }
  }, [])

  return (
    <div>
      {gameType === 'userSelect' && (
        <UserSelect selected={selected} handleSetSelected={handleSetSelected} lang={lang} />
      )}
      {gameType === 'textToAudioImg' && (
        <TextToAudioImg
          answered={answered}
          q={q}
          answers={answers}
          selected={selected}
          handleSetSelected={handleSetSelected}
          handlePlayAudio={handlePlayAudio}
          lang={lang}
        />
      )}
      {gameType === 'audioImgToText' && (
        <AudioImgToText
          answered={answered}
          q={q}
          answers={answers}
          selected={selected}
          handleSetSelected={handleSetSelected}
          handlePlayAudio={handlePlayAudio}
          lang={lang}
        />
      )}
      <button
        disabled={!selected}
        className={`
            submitBtn
            ${answered}
          `}
        onClick={() => handleSubmit(selected)}
      >
        O
      </button>
    </div>
  )
}

export default App

import React from 'react'
import './App.css'
import { imgs, audio } from './assets'

const App = ({states, dispatchers, actionDefs, api}) => {
    const { getQs, getAnswers } = api
    const {shuffle} = states.envsDepsMocksState.deps
    const {settingsDispatcher} = dispatchers
    const {lang, gameType, userName} = states.settingsState
    const {
        setGameTypeToAudioImg,
        setUserNameToCat,
        setUserNameToDog,
        setUserNameToFox,
    } = actionDefs.settingsActionDefs

    const [qs, setQs] = React.useState([])
    const [q, setQ] = React.useState({})
    const [answers, setAnswers] = React.useState([])
    const [qIndex, setQIndex] = React.useState(0)
    const [selected, setSelected] = React.useState(null)
    const [answered, setAnswered] = React.useState("")

    // eslint-disable-next-line no-unused-vars
    const { id, text_en, text_it, text_de, audioId_en, audioId_it, audioId_de, imgId } = q || {}

    const [scores, setScores] = React.useState({})
    React.useEffect(() => {
        const items = localStorage.getItem(userName)
        if (items) {
            setScores(JSON.parse(items))
        } else {
            setScores({})
        }
    }, [userName])

    React.useEffect(() => setQs(getQs(10)), [getQs])

    React.useEffect(() => setQ(qs[qIndex]), [qIndex, qs])

    React.useEffect(() => {
        const createAnswers = () => {
            const _answers = shuffle([q, ...getAnswers(id)])
            console.log(`!!`, { _answers })
            setAnswers(_answers)
        }
        if (q) createAnswers()
    }, [getAnswers, id, q, shuffle])

    const handleSubmit = _selected => {
        console.log(`!!`, { _selected })
        if (gameType === "userSelect") {
            if (_selected === "cat") settingsDispatcher(setUserNameToCat)
            if (_selected === "dog") settingsDispatcher(setUserNameToDog)
            if (_selected === "fox") settingsDispatcher(setUserNameToFox)
            setSelected(null)
            setTimeout(() => setAnswered(""), 1000)
            settingsDispatcher(setGameTypeToAudioImg)
        } else if (_selected === id) {
            const newScores = {
                ...scores,
                [id]: scores[id] ? scores[id] + 1 : 1
            }
            setScores(newScores)
            setAnswered("correct")
            setSelected(null)
            setTimeout(() => setAnswered(""), 1000)
            localStorage.setItem(userName, JSON.stringify(newScores))
        } else {
            const newScores = {
                ...scores,
                [id]: scores[id] ? scores[id] - 1 : -1
            }
            setScores(newScores)
            setAnswered("incorrect")
            setSelected(null)
            setTimeout(() => setAnswered(""), 1000)
            localStorage.setItem(userName, JSON.stringify(newScores))
        }
        setQIndex(qIndex + 1)
    }

    const handleSetSelected = _selected => {
        console.log(`!!`, { _selected, selected })
        if (_selected === selected) {
            setSelected(null)
        } else {
            setSelected(_selected)
        }
    }
    const handlePlayAudio = (_answer, cb, _lang) => {
        if (_answer.id !== selected) {
            const src = audio[getAudioId(_lang, _answer.id)]
            const audioElement = src && new Audio(src)
            audioElement.play().then(() => cb(_answer.id))
        } else {
            cb(_answer.id)
        }
    }

    const getText = React.useCallback((_lang) => {
        switch (_lang) {
            case 'en':
                return text_en
            case 'it':
                return text_it
            case 'de':
                return text_de
            default:
                return console.error(`value of _lang is: ${_lang}`)
        }
    }, [text_de, text_en, text_it])

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


    if (answered) return <div className={answered}><h1>{answered === "correct" ? "That's right!!!" : "Better luck next time!!!"}</h1></div>
    return (
      <div>
        <h1>{gameType !== "userSelect" ? getText(lang) : `choose user!`}</h1>
        <div className="answerWrapper">
            {gameType === "userSelect" && (
                <React.Fragment>
                    <div className={selected === "cat" && "selected"}>
                        <img
                            onClick={() => handleSetSelected("cat")}
                            className="icon"
                            src={imgs.cat}
                            alt="cat"
                        />
                    </div>
                    <div className={selected === "fox" && "selected"}>
                        <img
                            onClick={() => handleSetSelected("fox")}
                            className="icon"
                            src={imgs.fox}
                            alt="fox"
                        />
                    </div>
                        <div className={selected === "dog" && "selected"}>
                        <img
                            onClick={() => handleSetSelected("dog")}
                            className="icon"
                            src={imgs.dog}
                            alt="dog"
                        />
                    </div>
                </React.Fragment>
            )}
            {userName && gameType === "img" && answers.map((answer, k) =>
                <div key={k} className={selected === answer.id ? "selected" : ""}>
                    <img
                        onClick={() => handleSetSelected(answer.id)}
                        className="icon"
                        src={imgs[answer.imgId]}
                        alt={answer.imgId}
                    />
                </div>
            )}
            {userName && gameType === "audio" && answers.map((answer, k) =>
                <div key={k} className={selected === answer.id ? "selected" : ""}>
                  <button
                      onClick={() => handlePlayAudio(answer, handleSetSelected, lang)}
                      className="icon"
                  >
                      PLAY
                  </button>
              </div>
            )}
            {userName && gameType === "audioImg" && answers.map((answer, k) =>
              <div key={`${answer.id}_${k}`} className={selected === answer.id ? "selected" : ""}>
                  <img
                      onClick={() => handlePlayAudio(answer, handleSetSelected, lang)}
                      className="icon"
                      src={imgs[answer.imgId]}
                      alt={answer.imgId}
                  />
              </div>
            )}
      </div>
      <button disabled={!selected} className="submitBtn" onClick={() => handleSubmit(selected)}>
          SUBMIT
      </button>
    </div>
  )
}

export default App

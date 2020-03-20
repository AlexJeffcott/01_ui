import React from 'react'
import './App.css'
import { imgs, audio } from './assets'

const users = [
    {id: "leo", imgId: "cat"},
    {id: "alex", imgId: "dog"},
    {id: "elisa", imgId: "fox"},
    ]

const App = ({ actions }) => {
    const { getQs, getAnswers, getDeps } = actions
    const { get, shuffle } = getDeps()

    const [qs, setQs] = React.useState([])
    const [q, setQ] = React.useState({})
    const [answers, setAnswers] = React.useState([])
    const [qIndex, setQIndex] = React.useState(0)
    const [lang, setLang] = React.useState("en")
    const [gameType, setGameType] = React.useState("audioimg")
    const [selected, setSelected] = React.useState(null)
    const [answered, setAnswered] = React.useState("")
    const [userName, setUserName] = React.useState("leo")

    // eslint-disable-next-line no-unused-vars
    const { id, text_en, text_it, text_de, audioId_en, audioId_it, audioId_de, imgId } = q || {}
    console.log(`!!`, { userName })
    const cachedScores = userName ? localStorage.getItem(userName) : {}
    const [scores, setScores] = React.useState(cachedScores && JSON.parse(cachedScores))

    React.useEffect(() => {
        if (userName && scores) localStorage.setItem(userName, JSON.stringify(scores))
    }, [userName, scores])

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
        if (users.some(u => u.id === _selected)) {
            setUserName(_selected)
            setSelected(null)
            setTimeout(() => setAnswered(""), 1000)
        } else if (_selected === id) {
            setScores({
                ...scores,
                [id]: scores[id] ? scores[id] + 1 : 1
            })
            setAnswered("correct")
            setSelected(null)
            setTimeout(() => setAnswered(""), 1000)
        } else {
            setScores({
                ...scores,
                [id]: scores[id] ? scores[id] - 1 : -1
            })
            setAnswered("incorrect")
            setSelected(null)
            setTimeout(() => setAnswered(""), 1000)
        }
        setQIndex(qIndex + 1)
    }
    const handleChangeLang = _lang => {
        console.log(`!!`, { _lang })
        setLang(_lang)
    }
    const handleChangeGameType = _gameType => {
        console.log(`!!`, { _gameType })
        setGameType(_gameType)
    }
    const handleSetSelected = _selected => {
        console.log(`!!`, { _selected, selected })
        if (_selected === selected) {
            setSelected(null)
        } else {
            setSelected(_selected)
        }
    }
    const handlePlayAudio = (_answer, cb) => {
        if (_answer.id !== selected) {
            const src = audio[get(_answer, `audioId_${lang}`, "")]
            const audioElement = src && new Audio(src)
            audioElement.play().then(() => cb(_answer.id))
        } else {
            cb(_answer.id)
        }
    }

    const getText = _lang => {
        switch (_lang) {
            case 'en':
                return text_en
            case 'it':
                return text_it
            case 'de':
                return text_de
            default:
                return console.error("no lang is defined")
        }
    }

    if (answered) return <div className={answered}><h1>{answered === "correct" ? "That's right!!!" : "Better luck next time!!!"}</h1></div>
    return (
      <div>
        <h1>{userName ? getText(lang) : `choose your animal!`}</h1>
        <div className="answerWrapper">
            {!userName && users.map((u, k) => <div key={k} className={selected === u.id ? "selected" : ""}>
            <img
                onClick={() => handleSetSelected(u.id)}
                className="icon"
                src={imgs[u.imgId]}
            />
        </div>)}
            {userName && gameType === "img" && answers.map((answer, k) =>
                <div key={k} className={selected === answer.id ? "selected" : ""}>
                    <img
                        onClick={() => handleSetSelected(answer.id)}
                        className="icon"
                        src={imgs[answer.imgId]}
                    />
                </div>
            )}
              {userName && gameType === "audio" && answers.map((answer, k) => {
                  return (
                    <div key={k} className={selected === answer.id ? "selected" : ""}>
                      <button
                          onClick={() => handlePlayAudio(answer, handleSetSelected)}
                          className="icon"
                      >
                          PLAY
                      </button>
                  </div>
              )})}
              {userName && gameType === "audioimg" && answers.map((answer, k) => {
                  return (
                  <div key={k} className={selected === answer.id ? "selected" : ""}>
                      <img
                          onClick={() => handlePlayAudio(answer, handleSetSelected)}
                          className="icon"
                          src={imgs[answer.imgId]}
                      />
                  </div>
              )})}
          </div>
      <button disabled={!selected} className="submitBtn" onClick={() => handleSubmit(selected)}>
          SUBMIT
      </button>
          <div className="langSelectWrapper">
              <button className={lang === "en" ? "selectedBtn" : ""} onClick={() => handleChangeLang("en")}>en</button>
              <button className={lang === "de" ? "selectedBtn" : ""} onClick={() => handleChangeLang("de")}>de</button>
              <button className={lang === "it" ? "selectedBtn" : ""} onClick={() => handleChangeLang("it")}>it</button>
          </div>
          <div className="gameTypeSelectWrapper">
              <button className={gameType === "audioimg" ? "selectedBtn" : ""} onClick={() => handleChangeGameType("audioimg")}>audio image</button>
              <button className={gameType === "audio" ? "selectedBtn" : ""} onClick={() => handleChangeGameType("audio")}>audio</button>
              <button className={gameType === "img" ? "selectedBtn" : ""} onClick={() => handleChangeGameType("img")}>image</button>
          </div>
    </div>
  )
}

export default App

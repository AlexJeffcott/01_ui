import React from 'react'
import './App.css'
import { imgs } from './assets'

const App = ({ actions }) => {
    const { getQs, getAnswers, getDeps } = actions
    const { get, shuffle } = getDeps()

    const [qs, setQs] = React.useState([])
    const [q, setQ] = React.useState({})
    const [answers, setAnswers] = React.useState([])
    const { id, word, imgId } = q || {}

    const [qIndex, setQIndex] = React.useState(0)
    const [lang, setLang] = React.useState("en")
    const [selected, setSelected] = React.useState(null)

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
        if (_selected === id) {
            alert("That is right!")
        } else {
            alert("Try again!")
        }
        setQIndex(qIndex + 1)
    }
    const handleChangeLang = _lang => {
        console.log(`!!`, { _lang })
        setLang(_lang)
    }
    const handleSetSelected = _selected => {
        console.log(`!!`, { _selected })
        setSelected(_selected)
    }
    return (
      <div className="App">
        <button onClick={() => handleChangeLang("en")}>en</button>
        <button onClick={() => handleChangeLang("de")}>de</button>
        <button onClick={() => handleChangeLang("it")}>it</button>
        <div>
            {get(word, `${lang}.text`)}
        </div>
        <div>
            {answers.map((answer, k) =>
                <div key={k} className={selected === answer.id ? "selected" : ""}>
                    <img
                        onClick={() => handleSetSelected(answer.id)}
                        className="icon"
                        src={imgs[answer.imgId]}
                    />
                </div>
            )}
        </div>
      <button onClick={() => handleSubmit(selected)}>
          SUBMIT
      </button>
    </div>
  )
}

export default App

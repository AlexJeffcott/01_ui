import React from 'react'
import {imgs} from '../assets'

export default function TextToAudioImg({ answers, selected, handleSetSelected, handlePlayAudio, lang }){
    return (
        answers.map((answer, k) =>
            <div key={`${answer.id}_${k}`} className={selected === answer.id ? "selected" : ""}>
                <img
                    onClick={() => handlePlayAudio(answer, handleSetSelected, lang)}
                    className="icon"
                    src={imgs[answer.imgId]}
                    alt={answer.imgId}
                />
            </div>
        )
    )
}
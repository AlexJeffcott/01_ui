import React from 'react'
import '../../App.css'
import { imgs, audio } from '../../../assets'

export default function AssetViewer ({ states, dispatchers, actionDefs, api }) {
  const { questions } = states.envsDepsMocksState.mocks

  const handlePlayAudio = async (id, audioId) => {
    const src = audio[audioId]
    const audioElement = await new Audio(src)
    audioElement.play()
  }

  return (
    <React.Fragment>
      <h1>Assets</h1>
      <table className="assetTable">
        <thead>
          <tr>
            <th>en</th>
            <th>it</th>
            <th>de</th>
            <th>img</th>
          </tr>
        </thead>
        <br />
        <tbody>
          {questions.map((q, k) => {
            return (
              <tr key={k}>
                <td className="clickable" onClick={() => handlePlayAudio(q.id, q.audioId_en)}>
                  {q.text_en}
                </td>
                <td className="clickable" onClick={() => handlePlayAudio(q.id, q.audioId_it)}>
                  {q.text_it}
                </td>
                <td className="clickable" onClick={() => handlePlayAudio(q.id, q.audioId_de)}>
                  {q.text_de}
                </td>
                <td>
                  <img className="assetImg" src={imgs[q.imgId]} alt={q.imgId} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  )
}

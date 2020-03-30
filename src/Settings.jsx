import React from 'react'
import { imgs } from './assets'
import { Link } from 'react-router-dom'

export default function Settings({ states, dispatchers, actionDefs, api }) {
  const { settingsDispatcher } = dispatchers
  const { settingsIsOpen, lang, gameType, userName, course } = states.settingsState
  const {
    setSettingsToOpen,
    setSettingsToClosed,
    setGameTypeTextToAudioImg,
    setGameTypeAudioImgToText,
    setGameTypeUserSelect,
    setLangToEn,
    setLangToIt,
    setLangToDe,
    setCourse001,
  } = actionDefs.settingsActionDefs

  const handleToggleSettings = () => settingsDispatcher(settingsIsOpen ? setSettingsToClosed : setSettingsToOpen)

  return (
    <div className={`settingsContainer ${settingsIsOpen ? 'fullScreen' : ''}`}>
      {!settingsIsOpen ? (
        <img onClick={handleToggleSettings} className="avatar clickable" src={imgs[userName]} alt="User Avatar" />
      ) : (
        <div onClick={handleToggleSettings} className="settingsCloseBtn">X</div>
      )}
      {settingsIsOpen && (
        <React.Fragment>
          <h1>Settings</h1>
          <button className={lang === 'en' ? 'selectedBtn' : ''} onClick={() => settingsDispatcher(setLangToEn)}>
            en
          </button>
          <button className={lang === 'it' ? 'selectedBtn' : ''} onClick={() => settingsDispatcher(setLangToIt)}>
            it
          </button>
          <button className={lang === 'de' ? 'selectedBtn' : ''} onClick={() => settingsDispatcher(setLangToDe)}>
            de
          </button>
          <hr />
          <button
            className={gameType === 'textToAudioImg' ? 'selectedBtn' : ''}
            onClick={() => settingsDispatcher(setGameTypeTextToAudioImg)}
          >
            text to audio image
          </button>
          <button
            className={gameType === 'audioImgToText' ? 'selectedBtn' : ''}
            onClick={() => settingsDispatcher(setGameTypeAudioImgToText)}
          >
            audio image to text
          </button>
          <button
            className={gameType === 'userSelect' ? 'selectedBtn' : ''}
            onClick={() => settingsDispatcher(setGameTypeUserSelect)}
          >
            Choose User
          </button>
          <hr />
          <button className={course === '001' ? 'selectedBtn' : ''} onClick={() => settingsDispatcher(setCourse001)}>
            Course 1
          </button>
          <hr />
          <Link to="/">Home</Link>
          <Link to="/assets">Assets</Link>
        </React.Fragment>
      )}
    </div>
  )
}

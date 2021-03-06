import React from 'react'
import { imgs } from '../../../assets'
import { Link } from 'react-router-dom'

function SettingsUI ({ states, dispatchers, actionDefs, api }) {
  const { settingsDispatcher } = dispatchers
  const { settingsIsOpen, lang, gameType, userName, course } = states.settingsState
  const { courses } = states.envsDepsMocksState.mocks
  const {
    setSettingsToOpen,
    setSettingsToClosed,
    setGameTypeTextToAudioImg,
    setGameTypeAudioImgToText,
    setGameTypeUserSelect,
    setLangToEn,
    setLangToIt,
    setLangToDe,
    setCourse
  } = actionDefs.settingsActionDefs

  const handleToggleSettings = () => settingsDispatcher(settingsIsOpen ? setSettingsToClosed : setSettingsToOpen)

  return (
    <div className={`settingsContainer ${settingsIsOpen ? 'fullScreen' : ''}`}>
      {!settingsIsOpen ? (
        <img onClick={handleToggleSettings} className="avatar clickable" src={imgs[userName]} alt="User Avatar" />
      ) : (
        <div onClick={handleToggleSettings} className="settingsCloseBtn">
          X
        </div>
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
          {Object.keys(courses).map((c, i) => (
            <button key={i} className={course === c ? 'selectedBtn' : ''} onClick={() => settingsDispatcher(setCourse(c))}>
              Course {c}
            </button>
          ))}
          <hr />
          <Link to="/">Home</Link>
          <Link to="/assets">Assets</Link>
        </React.Fragment>
      )}
    </div>
  )
}

export default SettingsUI

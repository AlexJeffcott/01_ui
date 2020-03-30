import React from "react"
import Routes from './Routes'
import Settings from './Settings'

const initialSettings = {
    settingsIsOpen: false,
    lang: "en",
    gameType: "userSelect",
    userName: "defaultUser",
    course: "001"
}

export const settingsActionDefs = {
    setSettingsToOpen: { type: "toggleSettingsOpenState", payload: {settingsIsOpen: true}},
    setSettingsToClosed: { type: "toggleSettingsOpenState", payload: {settingsIsOpen: false}},
    setGameTypeTextToAudioImg: { type: "setGameType", payload: {gameType: "textToAudioImg"}},
    setGameTypeAudioImgToText: { type: "setGameType", payload: {gameType: "audioImgToText"}},
    setGameTypeUserSelect: { type: "setGameType", payload: {gameType: "userSelect"}},
    setLangToEn: { type: "setLang", payload: {lang: "en"}},
    setLangToIt: { type: "setLang", payload: {lang: "it"}},
    setLangToDe: { type: "setLang", payload: {lang: "de"}},
    setUserNameToCat: { type: "setUserName", payload: {userName: "cat"}},
    setUserNameToDog: { type: "setUserName", payload: {userName: "dog"}},
    setUserNameToFox: { type: "setUserName", payload: {userName: "fox"}},
    setCourse001: { type: "setCourse", payload: {course: "001"}},
}

function settingsReducer(state, action) {
  switch (action.type) {
      case 'toggleSettingsOpenState':
        return {...state, ...action.payload}
      case 'setLang':
          return {...state, ...action.payload}
      case 'setGameType':
          return {...state, ...action.payload}
      case 'setUserName':
          return {...state, ...action.payload}
      case 'setCourse':
          return {...state, ...action.payload}
    default:
      throw new Error({ action })
  }
}

export default function NavAndSettings({states, dispatchers, actionDefs, api}) {
    const [settingsState, settingsDispatcher] = React.useReducer(settingsReducer, initialSettings)

    const _dispatchers = {
        ...dispatchers,
        settingsDispatcher
    }

    const _states = {
        ...states,
        settingsState
    }

    const _actionDefs = {
        ...actionDefs,
        settingsActionDefs
    }

    return (
        <React.Fragment>
            <Routes states={_states} dispatchers={_dispatchers} actionDefs={_actionDefs} api={api} />
        </React.Fragment>
    )
}
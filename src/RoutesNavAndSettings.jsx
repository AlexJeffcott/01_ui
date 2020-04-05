import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Nav from './Nav'
import Settings from './Settings'
import App from './App'
import AssetViewer from './AssetViewer'

const initialSettings = {
  settingsIsOpen: false,
  lang: 'en',
  gameType: 'userSelect',
  userName: 'defaultUser',
  course: '001'
}

export const settingsActionDefs = {
  setSettingsToOpen: { type: 'toggleSettingsOpenState', payload: { settingsIsOpen: true } },
  setSettingsToClosed: { type: 'toggleSettingsOpenState', payload: { settingsIsOpen: false } },
  setGameTypeTextToAudioImg: { type: 'setGameType', payload: { gameType: 'textToAudioImg' } },
  setGameTypeAudioImgToText: { type: 'setGameType', payload: { gameType: 'audioImgToText' } },
  setGameTypeUserSelect: { type: 'setGameType', payload: { gameType: 'userSelect' } },
  setLangToEn: { type: 'setLang', payload: { lang: 'en' } },
  setLangToIt: { type: 'setLang', payload: { lang: 'it' } },
  setLangToDe: { type: 'setLang', payload: { lang: 'de' } },
  setUserNameToCat: { type: 'setUserName', payload: { userName: 'cat' } },
  setUserNameToFox: { type: 'setUserName', payload: { userName: 'fox' } },
  setUserNameToDog: { type: 'setUserName', payload: { userName: 'dog' } },
  setUserNameToMonkey: { type: 'setUserName', payload: { userName: 'monkey' } },
  setCourse: course => ({ type: 'setCourse', payload: { course } })
}

function settingsReducer (state, action) {
  switch (action.type) {
    case 'toggleSettingsOpenState':
      return { ...state, ...action.payload }
    case 'setLang':
      return { ...state, ...action.payload }
    case 'setGameType':
      return { ...state, ...action.payload }
    case 'setUserName':
      return { ...state, ...action.payload }
    case 'setCourse':
      return { ...state, ...action.payload }
    default:
      throw new Error({ action })
  }
}

export default function RoutesNavAndSettings ({ states, dispatchers, actionDefs, api }) {
  const [settingsState, settingsDispatcher] = React.useReducer(settingsReducer, initialSettings)

  const { BASE_URL } = states.envsDepsMocksState.envs

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
    <Router basename={BASE_URL}>
      <Switch>
        <Route exact path="/">
          <App states={_states} dispatchers={_dispatchers} actionDefs={_actionDefs} api={api} />
        </Route>
        <Route exact path="/assets">
          <AssetViewer states={_states} dispatchers={_dispatchers} actionDefs={_actionDefs} api={api} />
        </Route>
      </Switch>
      {/* <Nav /> */}
      <Settings states={_states} dispatchers={_dispatchers} actionDefs={_actionDefs} api={api} />
    </Router>
  )
}

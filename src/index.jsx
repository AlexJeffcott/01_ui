import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'
import get from 'lodash.get'
import shuffle from 'lodash.shuffle'
// import axios from 'axios'
// import store from 'store'
import './index.css'
import Api from './Api'
import * as serviceWorker from './serviceWorker'
import { courses, questions } from './__mocks__'

const envs = {
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL: process.env.NODE_ENV !== 'development' ? '/01_ui' : '',
  REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT
}

const deps = {
  get,
  shuffle,
  httpClient: null
  // store,
}

const mocks = {
  courses,
  questions
}

const envsDepsMocksInitialState = { envs, deps, mocks }

export const envsDepsMocksActionDefs = {
  consoleEnvsDepsMocksState: { type: 'getEnvsDepsMocksState' },
  setEnv: envNameValuePair => ({ type: 'setEnvState', payload: envNameValuePair })
}

const envsDepsMocksReducer = (state, action) => {
  switch (action.type) {
    case 'consoleState':
      console.log('!!', { state })
      return state
    case 'setEnv':
      return {
        ...state,
        envs: {
          ...state.envs,
          ...action.payload
        }
      }
    default:
      throw new Error()
  }
}

const AppWrapper = () => {
  const [envsDepsMocksState, envsDepsMocksReducerDispatch] = useReducer(envsDepsMocksReducer, envsDepsMocksInitialState)

  const states = {
    envsDepsMocksState
  }
  const dispatchers = {
    envsDepsMocksReducerDispatch
  }
  const actionDefs = {
    envsDepsMocksActionDefs
  }
  return <Api states={states} dispatchers={dispatchers} actionDefs={actionDefs} />
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

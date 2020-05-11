import React, { useReducer } from 'react'
import get from 'lodash.get'
import shuffle from 'lodash.shuffle'
// import axios from 'axios'
// import store from 'store'

import { courses, questions } from '../../__mocks__'

import ApiDataLayer from './ApiDataLayer'

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
  setEnv: envNameValuePair => ({ type: 'setEnv', payload: envNameValuePair })
}

const envsDepsMocksReducer = (state, action) => {
  switch (action.type) {
    case 'getEnvsDepsMocksState':
      console.log('!! envsDepsMocks state:', { state })
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

function EnvsDepsMocksDataLayer () {
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
  return <ApiDataLayer states={states} dispatchers={dispatchers} actionDefs={actionDefs} />
}

export default EnvsDepsMocksDataLayer

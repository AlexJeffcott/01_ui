import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'
import get from 'lodash.get'
import shuffle from 'lodash.shuffle'
// import axios from 'axios'
// import store from 'store'
import './index.css'
import Api from './Api'
import * as serviceWorker from './serviceWorker'
import { questions } from './__mocks__'

const envs = {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT
}

const deps = {
    get,
    shuffle,
    httpClient: null,
    // store,
}

const mocks = {
    questions,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'consoleState':
            console.log("!!", { state } )
            return state
        case 'setEnv':
            return ({
                ...state,
                envs: {
                    ...state.envs,
                    [action.payload.envName]: action.payload.envValue
                },
            })
        default:
            throw new Error();
    }
}

const AppWrapper = () => {
    const [state, dispatch] = useReducer(reducer, {envs, deps, mocks})

    const actions = {
        consoleState: () => dispatch({type: "getEnvState"}),
        setEnv: (envName, envValue) => dispatch({type: "setEnvState", payload: {envName, envValue}}),
        getEnv: envPropString => state.env[envPropString],
        getEns: () => state.env,
        getDep: depPropString => state.deps[depPropString],
        getDeps: () => state.deps,
        getMock: mockPropString => state.mocks[mockPropString],
        getMocks: () => state.mocks,
    }

    return <Api actions={actions} />
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

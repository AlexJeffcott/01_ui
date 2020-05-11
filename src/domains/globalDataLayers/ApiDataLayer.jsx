import React from 'react'
import SettingsDataLayer from './SettingsDataLayer'

function ApiDataLayer ({ states, dispatchers, actionDefs }) {
  const { questions, courses } = states.envsDepsMocksState.mocks

  const api = {
    getQs: (num = 20, course = '001') => questions.filter(q => courses[course].some(c => c === q.id)).slice(0, num)
  }

  return <SettingsDataLayer states={states} dispatchers={dispatchers} actionDefs={actionDefs} api={api} />
}

export default ApiDataLayer

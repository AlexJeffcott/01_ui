import React from 'react'
import RoutesNavAndSettings from './RoutesNavAndSettings'

export default function Api ({ states, dispatchers, actionDefs }) {
  const { questions, courses } = states.envsDepsMocksState.mocks

  const api = {
    getQs: (num = 20, course = '001') => questions.filter(q => courses[course].some(c => c === q.id)).slice(0, num),
  }

  return <RoutesNavAndSettings states={states} dispatchers={dispatchers} actionDefs={actionDefs} api={api} />
}

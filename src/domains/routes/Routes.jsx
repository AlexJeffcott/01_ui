import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SettingsUI from '../views/settings/SettingsUI'
import App from '../App'
import AssetViewer from '../views/assetViewerPage/AssetViewer'
// import Nav from './Nav'

function Routes ({ states, dispatchers, actionDefs, api }) {
  const { BASE_URL } = states.envsDepsMocksState.envs

  return (
    <Router basename={BASE_URL}>
      <Switch>
        <Route exact path="/">
          <App states={states} dispatchers={dispatchers} actionDefs={actionDefs} api={api} />
        </Route>
        <Route exact path="/assets">
          <AssetViewer states={states} dispatchers={dispatchers} actionDefs={actionDefs} api={api} />
        </Route>
      </Switch>
      {/* <Nav /> */}
      <SettingsUI states={states} dispatchers={dispatchers} actionDefs={actionDefs} api={api} />
    </Router>
  )
}

export default Routes

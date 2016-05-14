import 'todomvc-app-css/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './containers/Root'

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {}
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const Root = require('./containers/Root').default
    ReactDOM.render(
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>
      ,
      document.getElementById('app')
    )
  })
}

/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { logger } from './middleware'
import createReducer from './reducers'
import sagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export default function configure (initialState, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const createStoreWithMiddleware = compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)
  const store = createStoreWithMiddleware(createReducer(), initialState)

  // Add all sagas to the saga middleware
  for (let i = 0; i < sagas.length; i++) {
    sagaMiddleware.run(sagas[i])
  }

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  // Initialize it with no other reducers
  store.asyncReducers = {}

  return store
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}

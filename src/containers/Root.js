import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll'
import App from 'containers/App'
import createRoutes from '../routes'
import referenctiallyEqualRootRoute from './referentially-equal-root-route'

export default class Root extends Component {
  render () {
    const { store, history } = this.props
    const rootRoute = {
      component: App,
      childRoutes: createRoutes(store)
    }
    const routes = Object.assign(referenctiallyEqualRootRoute, rootRoute)

    return (
      <Provider store={store}>
        <Router
          history={history}
          routes={routes}
          render={applyRouterMiddleware(useScroll())}
        />
      </Provider>
    )
  }
}

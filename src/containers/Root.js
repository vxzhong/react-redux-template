import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll'
import App from 'containers/App'
import createRoutes from '../routes'

export default class Root extends Component {
  render () {
    const { store, history } = this.props
    const rootRoute = {
      component: App,
      childRoutes: createRoutes(store)
    }
    console.log(rootRoute.childRoutes)
    return (
      <Provider store={store}>
        <Router
          history={history}
          routes={rootRoute}
          render={applyRouterMiddleware(useScroll())}
        />
      </Provider>
    )
  }
}

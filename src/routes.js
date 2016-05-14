// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the require.ensure code splitting business
import { injectAsyncReducer } from './store/configureStore'

// function errorLoading (err) {
//   console.error('Dynamic page loading failed', err) // eslint-disable-line no-console
// }

function loadModule (cb) {
  return (module) => cb(null, module.default)
}

function loadReducer (store, name) {
  return (module) => injectAsyncReducer(store, name, module.default)
}

export default function createRoutes (store) {
  return [
    {
      path: '/',
      getComponent (location, cb) {
        require.ensure([], function (require) {
          console.log('....')
          let page = require('containers/HomePage')
          let reducer = require('containers/HomePage/reducer')
          loadReducer(store, 'home')(reducer)
          loadModule(cb)(page)
        })
      }
    }, {
      path: '/features',
      getComponent (location, cb) {
        require.ensure([], function (require) {
          let page = require('containers/FeaturePage')
          loadModule(cb)(page)
        })
      }
    }, {
      path: '*',
      getComponent (location, cb) {
        require.ensure([], function (require) {
          let page = require('containers/NotFoundPage')
          loadModule(cb)(page)
        })
      }
    }
  ]
}

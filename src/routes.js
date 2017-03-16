/* global System b:true */
import React from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import store, { history } from 'src/store'
import App from 'src/containers/App' // eslint-disable-line

/* eslint-disable */
// Polyfill for the System.import
if (typeof System === 'undefined') {
  var System = {
    import(path) {
      return Promise.resolve(require(`${path}`))
    },
  }
}
/* eslint-enable */

// Switching to system.import to make use of dynamic tree shaking
// if loading a route fails, throw an error
const errorLoading = err =>
  console.error('Dynamic loading failed ' + err) // eslint-disable-line
// function to load a route module
const loadRoute = cb =>
  module =>
    cb(null, module.default)

// routes object containing
// component, path index and children route delared
// each route needs a module imported using System.import
export const routes = {
  component: App,
  path: '/',
  indexRoute: {
    getComponent(location, callback) {
      System.import('./containers/FoodSearch/index') // eslint-disable-line block-scoped-var
        .then(loadRoute(callback))
        .catch(err => errorLoading(err))
    },
  },
  childRoutes: [
    {
      path: '/food',
      getComponent(location, callback) {
        System.import('./containers/Result/index') // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err))
      },
    },
    {
      path: '*',
      getComponent(location, callback) {
        System.import('./components/PageNotFound/index') // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err))
      },
    },
  ],
}

// declare the router app
const RouterApp = props => (
  // connect it to the store using provider
  // and render each route inside router component
  <Provider {...props} store={store} >
    <Router
      history={history} // Scroll to top on route transitions
      onUpdate={() => window.scrollTo(0, 0)} // eslint-disable-line
    >
      {routes}
    </Router>
  </Provider>
)

export default RouterApp

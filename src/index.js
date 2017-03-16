import React from 'react'
import { render } from 'react-dom'
import { match } from 'react-router'
import { history } from 'src/store'
import RouterApp, { routes } from 'src/routes'

const isProduction = process.env.NODE_ENV === 'production'

// match the routes and render the router to the app
match({ history, routes },
  (error, redirectLocation, renderProps) => { // eslint-disable-line
    if (error) {
      return console.error('Require.ensure error') // eslint-disable-line
    }
    render(<RouterApp />, document.querySelector('#root'))
  })

if (!isProduction) {
  /* eslint-disable */
  // if the environment is production
  if (module.hot) {
    // and hot reloading is enabled
    // then hot reload the routes
    module.hot.accept('src/routes', () => {
      const NewRouterApp = require('src/routes').default
      render(<NewRouterApp />, document.querySelector('#root'))
    })
  }
  /* eslint-enable */
}

import { createStore, compose, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from 'src/rootReducer'
import rootEpic from 'src/rootEpic'
import { initialState as food } from 'src/containers/FoodSearch/reducer'

const initialState = {
  food
}

// creating epic middleware with root epic
const epicMiddleware = createEpicMiddleware(rootEpic)
// creating routing middleware using browser history
const routingMiddleware = routerMiddleware(browserHistory)
// create a middleware array with all the middleware
const middlewares = [epicMiddleware, routingMiddleware]

const isClient = typeof document !== 'undefined'
const isDeveloping = process.env.NODE_ENV !== 'production'

if (isDeveloping && isClient) {
  // in dev environment we create another middleware for logging
  // and push it to our middleware array
  const createLogger = require('redux-logger') // eslint-disable-line
  const loggerMiddleware = createLogger()
  middlewares.push(loggerMiddleware)
}


const enhancers = []
if (isClient && isDeveloping) {
  // if we are in dev env, then add enhancer for devtools
  const devToolsExtension = window.devToolsExtension
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

// we combine our enhancer and middleware
const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers,
)

// create store using rootreducer initial state and composedEnhancer
const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
)


export const history = isClient ?
  syncHistoryWithStore(browserHistory, store) : undefined

if (module.hot) {
  // if hot reloading is enabled
  module.hot.accept('src/rootReducer', () => {
    // we hot reload the reducers
    /*eslint-disable */ // Allow require
    const nextRootReducer = require('src/rootReducer').default
    /*eslint-enable */
    store.replaceReducer(nextRootReducer)
  })
}

export default store

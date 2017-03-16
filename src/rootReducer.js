import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import foodReducer from 'src/containers/FoodSearch/reducer'

// combine all the reducers to manage state atomically
const rootReducer = combineReducers({
  food: foodReducer,
  routing: routerReducer
})

export default rootReducer

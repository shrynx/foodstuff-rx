import * as constants from './constants'

export const initialState = {
  preparing: false,
  choice: '',
  foodItem: {}
}

const foodReducer = (state = initialState, action) => {
  switch(action.type) {
    case constants.FETCH_FOOD_DATA:
      // on FETCH_FOOD, set preparing to true and choice as the payload,
      // also fooditem as empty object
      return { preparing: true, choice: action.payload, foodItem: {} }
    case constants.FETCH_FOOD_DATA_FULLFILLED:
      // when fetching has completed successfully, keep the choice in state
      // and set preparing to false
      // also foodItem as the payload of the action
        return { ...state, preparing: false, foodItem: action.payload }
    case constants.FETCH_FOOD_DATA_FAILED:
      // If the fetch fails, keep the choice in state
      // and set preparing to false and foodItem as empty object
      return { ...state, preparing: false, foodItem: {} }
    case constants.CANCEL_FOOD_DATA:
      // if the fetch is cancelled return the initial state
      return initialState
    default:
        return state
  }
}

export default foodReducer

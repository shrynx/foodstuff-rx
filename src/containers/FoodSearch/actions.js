import * as constants from './constants'

/**
 * [cancelFoodData A Redux action which can be called anytime during a running food request so as to cancel it]
 * @return {Object} [returns object with type CANCEL_FOOD]
 */
export const cancelFoodData = () => {
  return ({
    type: constants.CANCEL_FOOD_DATA
  })
}
/**
 * [fetchFood A Redux action to start a test]
 * @param  {String}  choice [Provide the choice of the food]
 * @return {Object}     [Returns an object with payload choice and type as FETCH_FOOD]
 */
export const fetchFoodData = (choice) => {
  return ({
    type: constants.FETCH_FOOD_DATA,
    payload: choice
  })
}
/**
 * [fetchFoodFullfilled A Redux action that is automatically called when a food data is fetched]
 * @param  {Object}  payload [result of food data are passed to this function]
 * @return {Object}         [Returns an object with payload as provided data and type as FETCH_FOOD_FULLFILLED]
 */
export const fetchFoodDataFullfilled = (payload) => {
  return ({
    type: constants.FETCH_FOOD_DATA_FULLFILLED,
    payload
  })
}

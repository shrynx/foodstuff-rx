import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { push } from 'react-router-redux'
import * as constants from './constants'
import { fetchFoodDataFullfilled } from './actions'

/**
 *                                       Marble Daigram
 *
 *            FETCH_FOOD_DATA
 * action$ --------x----------------------------------------------------------------->
 *                  \     ajax request                                          ^^
 *                   \---------x---------------------------------|              ||
 *                    |         \  resolve header
 *                    |          \---x-|                                        ||
 *                    |               \               resolve body
 *                    |                \---------------------x-|                ||
 *                    |                 |        map(fetchFoodFullfilled)
 *                    |                 |--------------------x-|                ||
 *                    |
 *                    |             takeUntil(CANCEL_FOOD)
 *                    |----------------------------------------|
 *                    |                  catch errors
 *                    |----------------------------------------|
 *                    |             startWith(change route)
 *                    |----------------------------------------|
 *
 */

// epic takes an action stream
const foodEpic = action$ =>
  // this action stream is looking for action of type FETCH_FOOD
  action$.ofType(constants.FETCH_FOOD_DATA)
    // when it gets an action it creates new stream that it mergeMap/flatmaps into into itself
    .mergeMap(action =>
      Observable.fromPromise(fetch(`${process.env.REACT_APP_FOOD_DATA_API}/${action.payload}`))
        // the ajax call uses fetch hence has two promises in return one for header with another promise for body
        .mergeMap(response => (
          // we flat map these two streams
          Observable.fromPromise(response.json())
          // and pass the content from the body and fire the action fetchFoodFullfilled
            .map(payload => fetchFoodDataFullfilled(payload))
          )
        )
        // we care about the ajax stream until cancel action isn't fired
        // if we get a cancel action we stop listening to the stream
        .takeUntil(action$.ofType(constants.CANCEL_FOOD_DATA))
        // finally if there are any errors fromajax we catch them
        // and fire an action of type FETCH_FOOD_FAILED
        .catch(error => Observable.of({ type: constants.FETCH_FOOD_DATA_FAILED}))
        // start stream with changing route to /food
        .startWith(push('/food'))
    )

export default foodEpic

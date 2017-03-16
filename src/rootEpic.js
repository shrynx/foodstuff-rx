import { combineEpics } from 'redux-observable'
import foodEpic from 'src/containers/FoodSearch/epic'

// combine all the epics in the app to make one epic
// to provide to epic middleware
const rootEpic = combineEpics(
  foodEpic
)

export default rootEpic

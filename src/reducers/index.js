import { combineReducers } from 'redux'
//import { combineReducers } from 'redux-immutable'
import login from './loginReducer'

/*
export default combineReducers({
    login,
})
*/

const rootReducer = combineReducers({
    login,
})

export default rootReducer
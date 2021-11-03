import {
    combineReducers,
    applyMiddleware,
    createStore
} from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './auth/reducer'


const rootReducer = combineReducers({
    Auth: authReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store
import {
    combineReducers,
    applyMiddleware,
    createStore
} from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './auth/reducer'
import brandsReducer from './brand/reducer'

const rootReducer = combineReducers({
    Auth: authReducer,
    Brands: brandsReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store
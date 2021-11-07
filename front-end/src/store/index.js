import {
    combineReducers,
    applyMiddleware,
    createStore
} from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './auth/reducer'
import brandsReducer from './brand/reducer'
import productsReducer from './products/reducer'
import cartReducer from './cart/reducer'

const rootReducer = combineReducers({
    Auth: authReducer,
    Brands: brandsReducer,
    Products: productsReducer,
    Cart: cartReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store
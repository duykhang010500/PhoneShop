import {
    combineReducers,
    applyMiddleware,
    createStore
} from 'redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './auth/reducer'
import brandsReducer from './brands/reducer'
import productsReducer from './products/reducer'
import cartReducer from './cart/reducer'
import ordersReducer from './orders/reducer'
import wishListReducer from './wishList/reducer'
import customersReducer from './customers/reducer'
import newsReducer from './news/reducer'
import statisticsReducer from './statistics/reducer'
import couponsReducer from './coupons/reducer'
import compareReducer from './compare/reducer'

const rootReducer = combineReducers({
    Auth: authReducer,
    Brands: brandsReducer,
    Products: productsReducer,
    Cart: cartReducer,
    Orders: ordersReducer,
    WishList: wishListReducer,
    Customer: customersReducer,
    News: newsReducer,
    Statistics: statisticsReducer,
    Coupons: couponsReducer,
    Compare: compareReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store
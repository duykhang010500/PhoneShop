import { ACT_GET_DETAIL_ORDERS, ACT_GET_MY_ORDERS } from './action'
const initialState = {
    listOrders: [],
    detailOrder: null
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_MY_ORDERS:
            return {
                ...state,
                listOrders: action.payload.myOrders
            }
        case ACT_GET_DETAIL_ORDERS:
            return {
                ...state,
                detailOrder: action.payload.orders
            }
        default:
            return state
    }
}

export default ordersReducer
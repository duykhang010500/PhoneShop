import { ACT_GET_MY_ORDERS } from './action'
const initialState = {
    listOrders: []
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_MY_ORDERS:
            return {
                ...state,
                listOrders: action.payload.myOrders
            }
        default:
            return state
    }
}

export default ordersReducer
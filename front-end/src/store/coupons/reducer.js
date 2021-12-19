import { ACT_GET_LIST_COUPON } from "./action";

const initialState = {
    list: []
}

const couponsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_LIST_COUPON:
            return {
                ...state,
                list: action.payload.list
            }
        default:
            return state
    }
}

export default couponsReducer
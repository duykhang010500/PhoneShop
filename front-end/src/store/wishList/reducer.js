import { ACT_GET_MY_WISH_LIST } from "./action"

const initialState = []

const wishListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_MY_WISH_LIST:
            return action.payload.list
        default:
            return state
    }
}

export default wishListReducer
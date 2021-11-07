import { ACT_GET_ALL_PRODUCT } from "./action"

const initState = {
    list: [],
    detailProduct: null
}
const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case ACT_GET_ALL_PRODUCT:
            return {
                ...state,
                list: action.payload.list
            }
        default:
            return state
    }
}

export default productsReducer
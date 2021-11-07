import { ACT_GET_ALL_PRODUCT, ACT_GET_DETAIL_PRODUCT } from "./action"

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
        case ACT_GET_DETAIL_PRODUCT:
            return {
                ...state,
                detailProduct: action.payload.product
            }
        default:
            return state
    }
}

export default productsReducer
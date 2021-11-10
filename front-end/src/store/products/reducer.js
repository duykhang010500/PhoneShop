import {
    ACT_GET_ALL_PRODUCT,
    ACT_GET_BEST_DISCOUNT,
    ACT_GET_DETAIL_PRODUCT
} from "./actions"

const initState = {
    list: [],
    listBestDiscount: [],
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
        case ACT_GET_BEST_DISCOUNT:
            return {
                ...state,
                listBestDiscount: action.payload.list
            }
        default:
            return state
    }
}

export default productsReducer
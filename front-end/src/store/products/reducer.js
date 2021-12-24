import {
    ACT_FILTER_PRODUCT,
    ACT_GET_ALL_PRODUCT,
    ACT_GET_BEST_DISCOUNT,
    ACT_GET_COLORS_PRODUCT,
    ACT_GET_DETAIL_PRODUCT,
    ACT_GET_LIST_NEW_PRODUCT,
    ACT_GET_RELATED_LIST_PRODUCT,
    ACT_SEARCH_PRODUCT
} from "./actions"

const initState = {
    list: [],
    listBestDiscount: [],
    detailProduct: null,
    relatedListProduct: [],
    colorsProduct: [],
    searchProduct: [],
    filterListProduct: {
        list: [],
        totalItem: 0,
        currentPage: 0,
        totalPage: 0
    },
    listNewProduct: {
        list: [],
        totalItem: 0,
        currentPage: 0,
        totalPage: 0
    }
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
        case ACT_GET_RELATED_LIST_PRODUCT:
            return {
                ...state,
                relatedListProduct: action.payload.list
            }
        case ACT_GET_COLORS_PRODUCT:
            return {
                ...state,
                colorsProduct: action.payload.list
            }
        case ACT_SEARCH_PRODUCT:
            return {
                ...state,
                searchProduct: action.payload.list
            }
        case ACT_FILTER_PRODUCT:
            return {
                ...state,
                filterListProduct: {
                    ...state.filterListProduct,
                    list: action.payload.currentPage === 1
                        ? action.payload.products
                        : [
                            ...state.filterListProduct.list,
                            ...action.payload.products
                        ],
                    currentPage: action.payload.currentPage,
                    totalItem: action.payload.totalItem,
                    totalPage: action.payload.totalPage
                }
            }
        case ACT_GET_LIST_NEW_PRODUCT: {
            return {
                ...state,
                listNewProduct: {
                    list: action.payload.products,
                    currentPage: action.payload.currentPage,
                    totalItem: action.payload.totalItem,
                    totalPage: action.payload.totalPage
                }
            }
        }
        default:
            return state
    }
}

export default productsReducer
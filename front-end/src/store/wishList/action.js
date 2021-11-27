import wishlistServices from "../../services/wishlistServices"

export const ACT_ADD_TO_WISH_LIS = 'ACT_ADD_TO_WISH_LIST'
export const ACT_GET_MY_WISH_LIST = 'ACT_GET_MY_WISH_LIST'

export const actAddToWishList = (product_id) => async (dispatch) => {
    try {
        const res = await wishlistServices.addToWishList(product_id)
        console.log(res)
    } catch (err) {
        throw err
    }
}

export const actDeleteItemInWishList = (id) => async (dispatch) => {
    try {
        const res = await wishlistServices.deleteItemInWithList(id)
        console.log(res)
    } catch (err) {
        throw err
    }
}

export const actGetMyWishList = (list) => {
    return {
        type: ACT_GET_MY_WISH_LIST,
        payload: { list }
    }
}

export const actGetMyWishListAsync = () => async (dispatch) => {
    try {
        const res = await wishlistServices.getMyWishList()
        const list = res.data.data
        dispatch(actGetMyWishList(list))
    } catch (err) {
        throw err
    }
}
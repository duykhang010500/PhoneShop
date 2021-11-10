export const ACT_ADD_TO_CART = 'ACT_ADD_TO_CART'
export const ACT_DELETE_ITEM = 'ACT_DELETE_ITEM'
export const ACT_UPDATE_ITEM = 'ACT_UPDATE_ITEM'
export const ACT_DELETE_CART = 'ACT_DELETE_CART'

export const actAddToCart = (product) => {
    return {
        type: ACT_ADD_TO_CART,
        payload: { product }
    }
}

export const actDeleteItem = (productId) => {
    return {
        type: ACT_DELETE_ITEM,
        payload: { productId }
    }
}

export const actUpdateItem = (productId, numProduct) => {
    return {
        type: ACT_UPDATE_ITEM,
        payload: { productId, numProduct }
    }
}

export const actDeleteCart = () => {
    return {
        type: ACT_DELETE_CART,
        payload: {}
    }
}
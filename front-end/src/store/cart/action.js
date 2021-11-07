export const ACT_ADD_TO_CART = 'ACT_ADD_TO_CART'

export const actAddToCart = (product) => {
    return {
        type: ACT_ADD_TO_CART,
        payload: { product }
    }
}
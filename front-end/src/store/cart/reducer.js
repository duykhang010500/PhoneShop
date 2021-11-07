import { ACT_ADD_TO_CART } from "./action"


const getCart = () => {
    const cart = localStorage.getItem('cart')
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'))
    } else {
        return []
    }
}

const initState = {
    cart: getCart(),
    totalPrice: 0,
    totalItem: 0
}


const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case ACT_ADD_TO_CART:
            return {

            }
        default:
            return state
    }
}

export default cartReducer
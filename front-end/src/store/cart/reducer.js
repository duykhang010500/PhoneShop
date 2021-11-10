import { ACT_ADD_TO_CART, ACT_DELETE_CART, ACT_DELETE_ITEM, ACT_UPDATE_ITEM } from "./action"


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
        case ACT_ADD_TO_CART: {
            const check = state.cart.every(item => {
                return item.id !== action.payload.product.id
            })
            if (check) {
                let newCart = [...state.cart, { ...action.payload.product, quantity: 1 }]
                localStorage.setItem('cart', JSON.stringify(newCart))
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload.product, quantity: 1 }]
                }
            } else {
                alert('Sản phẩm này có trong giỏ hàng')
            }
        }
        case ACT_DELETE_ITEM: {
            let newCart = [...state.cart]
            console.log(newCart)
            newCart.forEach((item, index) => {
                if (item.id === action.payload.productId) {
                    newCart.splice(index, 1)
                }
            })
            localStorage.setItem('cart', JSON.stringify(newCart))
            return {
                ...state,
                cart: newCart
            }
        }
        case ACT_UPDATE_ITEM: {
            let newCart = [...state.cart]
            newCart.forEach((item) => {
                if (item.id === action.payload.productId) {
                    item.quantity = action.payload.numProduct
                }
            })
            localStorage.setItem('cart', JSON.stringify(newCart))
            return {
                ...state,
                cart: newCart
            }
        }
        case ACT_DELETE_CART: {
            let newCart = []
            localStorage.setItem('cart', JSON.stringify(newCart))
            return {
                ...state,
                cart: []
            }
        }
        default:
            return state
    }
}

export default cartReducer
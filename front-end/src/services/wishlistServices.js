import api from './api'

const wishlistServices = {
    addToWishList(product_id) {
        return api.callWithToken().post('/wishlists', {
            product_id
        })
    },
    deleteItemInWithList(id) {
        return api.callWithToken().delete('/wishlist', {
            params: {
                product_id: id
            }
        })
    },
    getMyWishList() {
        return api.callWithToken().get('/wishlists')
    }
}

export default wishlistServices
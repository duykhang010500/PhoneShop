import api from './api'

const productsServices = {
    getAll() {
        return api.callWithToken().get('/products')
    },
    create(formData) {
        return api.callWithToken().post('/products', formData)
    },
    delete(slug) {
        return api.callWithToken().delete('/product', {
            params: {
                slug
            }
        })
    },
    getDetailProduct(id) {
        return api.call().get(`/product?slug=${id}`)
    },
    getBestDiscount() {
        return api.call().get('/home/products?sort=price-discount')
    },
    ratingProduct(id, formData) {
        return api.callWithToken().post(`/ratings?id=${id}`, formData)
    },
    getRelatedListProduct(slug) {
        return api.call().get('/related-products', {
            params: {
                slug
            }
        })
    },
    getColorsProduct() {
        return api.call().get('/colors-product')
    },
    searchProduct(keyWord) {
        return api.call().get(`/search?data=${keyWord}`)
    }
}

export default productsServices
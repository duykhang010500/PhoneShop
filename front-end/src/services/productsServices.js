import api from './api'

const productsServices = {
    getAll() {
        return api.callWithToken().get('/product')
    },
    create(formData) {
        return api.callWithToken().post('/product', formData)
    },
    getDetailProduct(id) {
        return api.call().get(`/product_s?id=${id}`)
    }
}

export default productsServices
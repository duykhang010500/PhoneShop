import api from './api'

const productsServices = {
    getAll() {
        return api.callWithToken().get('/product')
    },
    create(formData) {
        return api.callWithToken().post('/product', formData)
    }
}

export default productsServices
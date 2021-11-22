import api from './api'
const orderServices = {
    makeNewOrder(formData) {
        return api.callWithToken().post('/user/confirm-order', formData)
    },
    getListOrder() {
        return api.callWithToken().get('/user/order')
    }
}

export default orderServices
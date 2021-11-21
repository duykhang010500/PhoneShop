import api from './api'
const orderServices = {
    makeNewOrder(formData) {
        return api.callWithToken().post('/user/confirm-order', formData)
    }
}

export default orderServices
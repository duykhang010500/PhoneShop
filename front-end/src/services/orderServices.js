import api from './api'
const orderServices = {
    makeNewOrder(formData) {
        return api.callWithToken().post('/user/confirm-order', formData)
    },
    getListOrder() {
        return api.callWithToken().get('/user/order')
    },
    getDetailOrder(orderCode) {
        return api.callWithToken().get('user/order-detail', {
            params: {
                order_code: orderCode
            }
        })
    },
    getListOrderUser(ordersTime) {
        return api.callWithToken().get('/admin/order-user', {
            params: {
                filter: ordersTime
            }
        })
    },
    getDetailOrderUser(order_code) {
        return api.callWithToken().get('/admin/order-user-detail', {
            params: {
                order_code
            }
        })
    },
    updateStatusOrders(order_code, status) {
        return api.callWithToken().post(`/admin/update-order?order_code=${order_code}`, status)
    },
    deleteOrder(order_code) {
        return api.callWithToken().delete(`/admin/delete-order?order_code=${order_code}`)
    },
    deleteOrderInProgress(order_code) {
        return api.callWithToken().delete('/user/delete-order', {
            params: {
                order_code
            }
        })
    }

}

export default orderServices
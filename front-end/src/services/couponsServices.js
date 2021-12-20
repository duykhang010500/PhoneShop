import api from './api'

const couponsServices = {
    getAll: () => {
        return api.call().get('/coupons')
    },
    createCoupon: (formData) => {
        return api.callWithToken().post('/coupons', formData)
    },
    deleteCoupon: (code) => {
        return api.callWithToken().delete('/coupon', {
            params: {
                coupon_code: code
            }
        })
    },
    updateCoupon: (code, formData) => {
        return api.callWithToken().put(`/coupon?coupon_code=${code}`, formData)
    },
    checkCoupon: (code) => {
        return api.call().get('/coupon', {
            params: {
                coupon_code: code
            }
        })
    }
}

export default couponsServices
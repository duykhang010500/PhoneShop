import couponsServices from "../../services/couponsServices"

export const ACT_GET_LIST_COUPON = 'ACT_GET_LIST_COUPON'

export const actGetListCoupon = (list) => {
    console.log(list)
    return {
        type: ACT_GET_LIST_COUPON,
        payload: { list }
    }
}

export const actGetListCouponAsync = () => async (dispatch) => {
    try {
        const res = await couponsServices.getAll()
        dispatch(actGetListCoupon(res.data.data))
    } catch (err) {
        throw err
    }
}

export const actCreateCouponAsync = (formData) => async (dispatch) => {
    try {
        await couponsServices.createCoupon(formData)
    } catch (err) {
        throw err
    }
}

export const actDeleteCouponAsync = (code) => async (dispatch) => {
    try {
        await couponsServices.deleteCoupon(code)
    } catch (err) {
        throw err
    }
}

export const actUpdateCouponAsync = (code, formData) => async (dispatch) => {
    try {
        await couponsServices.updateCoupon(code, formData)
    } catch (err) {
        throw err
    }
}

export const actCheckCoupon = (code) => async (dispatch) => {
    try {
        const res = await couponsServices.checkCoupon(code)
        console.log('Check coupon: ', res.data.data)
        if (res.data.data.length === 0) {
            return {
                ok: false
            }
        } else {
            return {
                ok: true,
                coupon: res.data.data[0]
            }
        }
    } catch (err) {
        throw err
    }
}
import productsServices from "../../services/productsServices"
export const ACT_GET_ALL_PRODUCT = 'ACT_GET_ALL_PRODUCT'
export const ACT_GET_DETAIL_PRODUCT = 'ACT_GET_DETAIL_PRODUCT'
export const ACT_GET_BEST_DISCOUNT = 'ACT_GET_BEST_DISCOUNT'

export const actGetListProduct = (list) => {
    return {
        type: ACT_GET_ALL_PRODUCT,
        payload: { list }
    }
}

export const actGetDetailProduct = (product) => {
    return {
        type: ACT_GET_DETAIL_PRODUCT,
        payload: { product }
    }
}

export const actGetBestDiscount = (list) => {
    return {
        type: ACT_GET_BEST_DISCOUNT,
        payload: { list }
    }
}

export const actGetAllProductAsync = () => async (dispatch) => {
    try {
        const res = await productsServices.getAll()
        // console.log(res.data.data)
        const list = res.data.data
        dispatch(actGetListProduct(list))
    } catch (err) {
        console.log(err)
    }
}

export const actCreateProductAsync = (formData) => async (dispatch) => {
    try {
        const res = await productsServices.create(formData)
        console.log(res)
        return {
            ok: true,
            message: 'Tạo mới thành công!'
        }
    } catch (err) {
        console.log(err)
        return {
            ok: false,
            message: 'Có lỗi xảy ra!'
        }
    }
}

export const actGetDetailProductAsync = (id) => async (dispatch) => {
    try {
        const res = await productsServices.getDetailProduct(id)
        console.log(res)
        const detailProduct = res.data.data
        console.log(detailProduct)
        dispatch(actGetDetailProduct(detailProduct))
    } catch (err) {
        console.log(err)
    }
}

export const actGetBestDiscountAsync = () => async (dispatch) => {
    try {
        const res = await productsServices.getBestDiscount()
        const list = res.data.data
        dispatch(actGetBestDiscount(list))
    } catch (err) {
        console.log(err)
    }
}

export const actRatingProductAsync = (id, formData) => async (dispatch) => {
    try {
        const res = await productsServices.ratingProduct(id, formData)
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}
import productsServices from "../../services/productsServices"
export const ACT_GET_ALL_PRODUCT = 'ACT_GET_ALL_PRODUCT'
export const ACT_GET_DETAIL_PRODUCT = 'ACT_GET_DETAIL_PRODUCT'

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
        // console.log(res)
        const detailProduct = res.data.data[0]
        console.log(detailProduct)
        dispatch(actGetDetailProduct(detailProduct))
    } catch (err) {
        console.log(err)
    }
}
import brandsServices from "../../services/brandsServices";

export const ACT_SET_LIST_BRAND = 'ACT_SET_LIST_BRAND'


export const actGetListBrand = (list) => {
    return {
        type: ACT_SET_LIST_BRAND,
        payload: { list }
    }
}
export const actGetListBrandAsync = () => async (dispatch) => {
    try {
        const res = await brandsServices.getList()
        // console.log(res.data.data)
        const brands = res.data.data
        dispatch(actGetListBrand(brands))
    } catch (err) {
        console.log(err)
    }
}

export const actCreateBrandAsync = (formData) => async (dispatch) => {
    try {
        const res = await brandsServices.createBrand(formData)
        console.log(res)
        return {
            ok: true,
            message: 'Tạo hãng mới thành công!'
        }
    } catch (err) {
        console.log(err)
        return {
            ok: false,
            message: 'Có lỗi xảy ra!'
        }
    }
}

export const actDeleteBrandAsync = (id) => async (dispatch) => {
    try {
        const res = await brandsServices.deleteBrand(id)
        console.log(res)
        return {
            ok: true,
            message: 'Xóa thành công!'
        }
    } catch (err) {
        return {
            ok: false,
            message: 'Có lỗi xảy ra!'
        }
    }
}

export const actUpdateBrandAsync = (id, formData) => async (dispatch) => {
    try {
        const res = await brandsServices.updateBrand(id, formData)
        console.log(res)
        return {
            ok: true,
            message: 'Cập nhật thành công'
        }
    } catch (err) {
        console.log(err)
        return {
            ok: false,
            message: 'Có lỗi xảy ra'
        }
    }
}
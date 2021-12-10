import productsServices from "../../services/productsServices"

// action types
export const ACT_GET_ALL_PRODUCT = 'ACT_GET_ALL_PRODUCT'
export const ACT_GET_DETAIL_PRODUCT = 'ACT_GET_DETAIL_PRODUCT'
export const ACT_GET_BEST_DISCOUNT = 'ACT_GET_BEST_DISCOUNT'
export const ACT_GET_RELATED_LIST_PRODUCT = 'ACT_GET_RELATED_LIST_PRODUCT'
export const ACT_GET_COLORS_PRODUCT = 'ACT_GET_COLORS_PRODUCT'
export const ACT_SEARCH_PRODUCT = 'ACT_GET_SEARCH_PRODUCT'
export const ACT_FILTER_PRODUCT = 'ACT_FILTER_PRODUCT'

// Lấy danh sách sản phẩm
export const actGetListProduct = (list) => {
    return {
        type: ACT_GET_ALL_PRODUCT,
        payload: { list }
    }
}

export const actGetAllProductAsync = () => async (dispatch) => {
    try {
        const res = await productsServices.filterProduct()
        console.log(res.data.data)
        const list = res.data.data.data
        dispatch(actGetListProduct(list))
    } catch (err) {
        console.log(err)
    }
}

export const actGetAllProductNotPaging = () => async (dispatch) => {
    try {
        const res = await productsServices.getAll()
        // console.log(res.data.data)
        // console.log(res)
        const list = res.data.data
        dispatch(actGetListProduct(list))
    } catch (err) {
        console.log(err)
    }
}

// Lấy chi tiết sản phẩm
export const actGetDetailProduct = (product) => {
    return {
        type: ACT_GET_DETAIL_PRODUCT,
        payload: { product }
    }
}

export const actGetDetailProductAsync = (id) => async (dispatch) => {
    try {
        const res = await productsServices.getDetailProduct(id)
        const detailProduct = res.data
        dispatch(actGetDetailProduct(detailProduct))
    } catch (err) {
        console.log(err)
    }
}

// Lấy danh sách sản phẩm giảm giá tốt
export const actGetBestDiscount = (list) => {
    return {
        type: ACT_GET_BEST_DISCOUNT,
        payload: { list }
    }
}

// Tạo sản phẩm
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

// Xoá sản phẩm
export const actDeleteProductAsync = (slug) => async (dispatch) => {
    try {
        const res = await productsServices.delete(slug)
        console.log(res)
    } catch (err) {
        throw err
    }
}

//Cập nhật sản phẩm
export const actUpdateProductAsync = (slug, formData) => async (dispatch) => {
    try {
        await productsServices.updateProduct(slug, formData)
        return {
            ok: true,
            message: 'Cập nhật thành công!'
        }
    } catch (err) {
        return {
            ok: false,
            message: 'Có lỗi xảy ra!'
        }
    }
}


// Lấy sản phẩm giảm giá tốt nhất
export const actGetBestDiscountAsync = () => async (dispatch) => {
    try {
        const res = await productsServices.getBestDiscount()
        const list = res.data.data
        dispatch(actGetBestDiscount(list))
    } catch (err) {
        console.log(err)
    }
}

// Đánh giá sp
export const actRatingProductAsync = (id, formData) => async (dispatch) => {
    try {
        await productsServices.ratingProduct(id, formData)
        return {
            ok: true,
            message: 'Đánh giá thành công!'
        }

    } catch (err) {
        return {
            ok: false,
            message: 'Bạn đã đánh giá sản phẩm này rồi!'
        }
    }
}


// lấy danh sách các sản phẩm tương tự

const actGetRelatedProductList = (list) => {
    return {
        type: ACT_GET_RELATED_LIST_PRODUCT,
        payload: { list }
    }
}
export const actGetRelatedListProductAsync = (slug) => async (dispatch) => {
    try {
        const res = await productsServices.getRelatedListProduct(slug)
        // console.log(res)
        const relatedProductList = res.data.data.data
        dispatch(actGetRelatedProductList(relatedProductList))

    } catch (err) {
        console.log(err)
    }
}

// lấy tất cả màu sắc của sản phẩm
export const actGetColorsProduct = (list) => {
    return {
        type: ACT_GET_COLORS_PRODUCT,
        payload: { list }
    }
}

export const actGetColorsProductAsync = () => async (dispatch) => {
    try {
        const res = await productsServices.getColorsProduct()
        const colorsProduct = res.data.data
        dispatch(actGetColorsProduct(colorsProduct))

    } catch (err) {
        throw err
    }
}

// tìm kiếm sản phẩm

const actSearchProduct = (list) => {
    return {
        type: ACT_SEARCH_PRODUCT,
        payload: { list }
    }
}

export const actSearchProductAsync = (keyWord) => async (dispatch) => {
    try {
        const res = await productsServices.searchProduct(keyWord)
        // console.log('Search result: ', res)
        const resultSearch = res.data.data.data
        dispatch(actSearchProduct(resultSearch))
    } catch (err) {
        throw err
    }
}

//Filter Product
export const actFilterProduct = ({
    products,
    totalItem,
    currentPage,
    totalPage
}) => {
    return {
        type: ACT_FILTER_PRODUCT,
        payload: {
            products,
            totalItem,
            totalPage,
            currentPage
        }
    }
}

export const actFilterProductAsync = ({
    page,
    ...restParams
} = {}) => async (dispatch) => {
    try {
        const res = await productsServices.filterProduct({
            page,
            ...restParams
        })
        console.log(res)
        const products = res.data.data.data
        const totalItem = res.data.data.total
        const currentPage = res.data.data.current_page
        const totalPage = res.data.data.last_page
        dispatch(actFilterProduct({
            products,
            totalItem,
            totalPage,
            currentPage
        }))
    } catch (err) {
        throw err
    }
}
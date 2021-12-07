import newsServices from "../../services/newsServices"

// Action types 
export const ACT_GET_CATEGORY_LIST = 'ACT_GET_CATEGORY_LIST'
export const ACT_GET_ARTICLE_LIST = 'ACT_GET_ARTICLE_LIST '
export const ACT_GET_DETAIL_ARTICLE = 'ACT_GET_DETAIL_ARTICLE'

// Lấy danh sách các chủ đề tin tức
const actGetCategoryList = (list) => {
    return {
        type: ACT_GET_CATEGORY_LIST,
        payload: { list }
    }
}
export const actGetCategoryListAsync = () => async (dispatch) => {
    try {
        const res = await newsServices.getCategoryList()
        dispatch(actGetCategoryList(res.data.data))
    } catch (err) {
        throw err
    }
}

// Tạo chủ đề tin tức mới
export const actCreateCategoryAsync = (formData) => async (dispatch) => {
    try {
        await newsServices.createCategory(formData)
        return {
            ok: true,
            message: 'Tạo mới chủ đề thành công!'
        }
    } catch (err) {
        if (err.response.data.errors.name) {
            return {
                ok: false,
                message: 'Tên chủ đề đã tồn tại!'
            }
        }
        if (err.response.data.errors.slug) {
            return {
                ok: false,
                message: 'Đường dẫn đã tồn tại!'
            }
        }
    }
}

//Xoá chủ đề
export const actDeleteCategory = (slug) => async (dispatch) => {
    try {
        await newsServices.deleteCategory(slug)
        return {
            ok: true,
            message: 'Xoá thành công!'
        }
    } catch (err) {
        throw err
    }
}

//Cập nhật chủ đề
export const actUpdateCategory = (slug, formData) => async (dispatch) => {
    try {
        await newsServices.updateCategory(slug, formData)
        return {
            ok: true,
            message: 'Cập nhật thành công!'
        }
    } catch (err) {
        throw err
    }
}

// Lấy danh sách bài viết
const actGetArticleList = (list) => {
    return {
        type: ACT_GET_ARTICLE_LIST,
        payload: { list }
    }
}

export const actGetArticleListAsync = (page) => async (dispatch) => {
    try {
        const res = await newsServices.getArticleList(page)
        // console.log(res)
        dispatch(actGetArticleList(res.data.data))
    } catch (err) {
        throw err
    }
}

//Xoá một bài viết
export const actDeleteArticleAsync = (slug) => async (dispatch) => {
    try {
        await newsServices.deleteArticle(slug)
        return {
            ok: true,
            message: 'Xoá thành công!'
        }
    } catch (err) {
        throw err
    }
}

// Tạo một bài viết
export const actCreateArticleAsync = (formData) => async (dispatch) => {
    try {
        await newsServices.createArticle(formData)
        return {
            ok: true,
            message: 'Tạo bài viết mới thành công!'
        }
    } catch (err) {
        return {
            ok: false,
            message: 'Tạo bài viết thất bại!'
        }
    }
}

// Lấy chi tiết một bài viết
export const actGetDetailArticle = (article) => {
    return {
        type: ACT_GET_DETAIL_ARTICLE,
        payload: { article }
    }
}

export const actGetDetailArticleAsync = (slug) => async (dispatch) => {
    try {
        const res = await newsServices.getDetailArticle(slug)
        console.log(res)
    } catch (err) {
        throw err
    }
}

// Cập nhật một bài viết
export const actUpdateArticleAsync = (slug, formData) => async (dispatch) => {
    try {
        await newsServices.updateArticle(slug, formData)
        return {
            ok: true,
            message: 'Cập nhật thành công!'
        }
    } catch (err) {
        throw err
    }
}
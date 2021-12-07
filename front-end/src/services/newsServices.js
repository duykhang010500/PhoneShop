import api from './api'

const newsServices = {
    getCategoryList: () => {
        return api.call().get('/cate-articles')
    },
    createCategory: (formData) => {
        return api.callWithToken().post('/cate-articles', formData)
    },
    deleteCategory: (slug) => {
        return api.callWithToken().delete(`/cate-article?slug=${slug}`)
    },
    updateCategory: (slug, formData) => {
        return api.callWithToken().put(`/cate-article?slug=${slug}`, formData)
    },
    getArticleList: (page = 1) => {
        return api.call().get(`/articles?page=${page}`)
    },
    createArticle: (formData) => {
        return api.callWithToken().post('/articles', formData)
    },
    deleteArticle: (slug) => {
        return api.callWithToken().delete(`/article?slug=${slug}`)
    },
    getDetailArticle: (slug) => {
        return api.call().get(`/article?slug=${slug}`)
    },
    updateArticle: (slug, formData) => {
        return api.callWithToken().put(`/article?slug=${slug}`, formData)
    }
}

export default newsServices
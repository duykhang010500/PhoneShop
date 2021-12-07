import { ACT_GET_ARTICLE_LIST, ACT_GET_CATEGORY_LIST, ACT_GET_DETAIL_ARTICLE } from "./action"

const initialState = {
    categoryList: [],
    articleList: [],
    detailArticle: null
}
const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_CATEGORY_LIST:
            return {
                ...state,
                categoryList: action.payload.list
            }
        case ACT_GET_ARTICLE_LIST:
            return {
                ...state,
                articleList: action.payload.list
            }
        case ACT_GET_DETAIL_ARTICLE: {
            return {
                ...state,
                detailArticle: action.payload.article
            }
        }
        default:
            return state
    }
}

export default newsReducer
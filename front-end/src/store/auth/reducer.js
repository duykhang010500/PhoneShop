import { ACT_SET_CURRENT_USER, ACT_SET_TOKEN } from "./action"

const initState = {
    token: localStorage.getItem('access_token') || '',
    currentUser: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case ACT_SET_TOKEN:
            if (action.payload.token) {
                localStorage.setItem('access_token', action.payload.token)
            } else {
                localStorage.removeItem('access_token')
            }
            return {
                ...state,
                token: action.payload.token
            }
        case ACT_SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.user
            }
        default:
            return state
    }
}

export default authReducer
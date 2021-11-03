import authServices from '../../services/authServices'

export const ACT_SET_TOKEN = 'ACT_SET_TOKEN'
export const ACT_SET_CURRENT_USER = 'ACT_SET_CURRENT_USER'


export const actSetToken = (token) => {
    return {
        type: ACT_SET_TOKEN,
        payload: { token }
    }
}

export const actSetCurrentUser = (user) => {
    return {
        type: ACT_SET_CURRENT_USER,
        payload: { user }
    }
}

export const actRegister = (formData) => async (dispatch) => {
    try {
        const res = await authServices.register(formData)
        console.log(res)
    } catch (err) {
        console.log(err.response.data)
    }

}

export const actLogin = (formData) => async (dispatch) => {
    try {
        const res = await authServices.login(formData)
        // console.log(res)
        const token = res.data.access_token
        if (token) {
            dispatch(actSetToken(token))
        }
        const currentUser = res.data.user
        dispatch(actSetCurrentUser(currentUser))
    } catch (err) {
        console.log(err.response.data)
    }
}

export const actFetchMe = () => async (dispatch) => {
    try {
        const res = await authServices.getMe()
        console.log(res)
        const token = res.data.access_token
        dispatch(actSetToken(token))
        const currentUser = res.data.user
        dispatch(actSetCurrentUser(currentUser))

    } catch (err) {
        console.log(err)
        dispatch(actSetToken(''))
        dispatch(actSetCurrentUser(null))
    }
}
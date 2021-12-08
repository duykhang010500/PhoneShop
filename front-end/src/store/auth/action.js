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
        // console.log(res)
        return {
            ok: true,
            message: 'Tạo tài khoản thành công!'
        }
    } catch (err) {
        return {
            ok: false,
            message: 'Email đã tồn tại, vui lòng nhập lại địa chỉ khác!'
        }
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
        localStorage.setItem('r', 1)
        return {
            ok: true,
            message: 'Đăng nhập thành công'
        }
    } catch (err) {
        console.log(err.response.data)
        const hashError = {
            "Unauthorized": "Sai email hoặc mật khẩu!"
        }

        const labelError = hashError[err.response.data.error]

        return {
            ok: false,
            message: labelError
        }
    }
}

export const actFetchMe = () => async (dispatch) => {
    try {
        const res = await authServices.getMe()
        // console.log(res)

        const token = res.data.access_token
        dispatch(actSetToken(token))
        const currentUser = res.data.user
        dispatch(actSetCurrentUser(currentUser))

    } catch (err) {
        // console.log(err)
        localStorage.removeItem('r')
        dispatch(actSetToken(''))
        dispatch(actSetCurrentUser(null))
    }
}

export const actChangePassword = (formData) => async (dispatch) => {
    try {
        const res = await authServices.changePassword(formData)
        console.log(res)
        return {
            ok: true,
            message: 'Thay đổi mật khẩu thành công!'
        }
    } catch (err) {
        console.log(err)
        return {
            ok: false,
            message: 'Mật khẩu hiện tại không đúng!'
        }
    }
}

export const actUpdateProfile = (formData) => async (dispatch) => {
    try {
        const res = await authServices.updateProfile(formData)
        console.log(res)
        return {
            ok: true,
            message: 'Cập nhật thông tin thành công!'
        }
    } catch (err) {
        console.log(err)
        return {
            ok: false,
            message: 'Có lỗi xảy ra!'
        }
    }
}

//Admin Role

export const actAdminLogin = (formData) => async (dispatch) => {
    try {
        const res = await authServices.adminLogin(formData)
        // console.log(res)
        const token = res.data.access_token
        if (token) {
            dispatch(actSetToken(token))
        }
        const currentUser = res.data.admin
        dispatch(actSetCurrentUser(currentUser))
        localStorage.setItem('r', 2)
        return {
            ok: true,
            message: 'Đăng nhập thành công'
        }
    } catch (err) {
        console.log(err.response.data)
        const hashError = {
            "Unauthorized": "Sai email hoặc mật khẩu!"
        }

        const labelError = hashError[err.response.data.error]

        return {
            ok: false,
            message: labelError
        }
    }
}

export const actGetAdmin = () => async (dispatch) => {
    try {
        const res = await authServices.getAdmin()
        // console.log(res)

        const token = res.data.access_token
        dispatch(actSetToken(token))
        const currentUser = res.data.admin
        dispatch(actSetCurrentUser(currentUser))

    } catch (err) {
        console.log(err)
        localStorage.removeItem('r')
        dispatch(actSetToken(''))
        dispatch(actSetCurrentUser(null))
    }
}
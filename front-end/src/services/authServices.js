import api from './api'

const authServices = {
    register(formData) {
        return api.call().post('/user/register', formData)
    },
    login(formData) {
        return api.call().post('/user/login', formData)
    },
    getMe() {
        return api.callWithToken().post('/user/refresh')
    },
    changePassword(formData) {
        return api.callWithToken().post('/user/change-pass', formData)
    },
    updateProfile(formData) {
        return api.callWithToken().put('/user/update-profile', formData)
    },
    adminLogin(formData) {
        return api.call().post('/admin/login', formData)
    },
    getAdmin() {
        return api.callWithToken().post('/admin/refresh')
    },
    sendMailResetPassword(email) {
        return api.call().post(`/user/reset-password?email=${email}`)
    },
    resetPassword(token, password) {
        return api.call().put('/user/reset-password', password, {
            params: {
                token: token
            }
        })
    }
}

export default authServices
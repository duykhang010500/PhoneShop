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
    }
}

export default authServices
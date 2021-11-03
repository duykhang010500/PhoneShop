import api from './api'

const authServices = {
    register(formData) {
        return api.call().post('/auth/user/register', formData)
    },
    login(formData) {
        return api.call().post('/auth/user/login', formData)
    },
    getMe() {
        return api.callWithToken().post('/auth/user/refresh')
    }
}

export default authServices
import api from './api'
const customerServices = {
    getList() {
        return api.callWithToken().get('/admin/users/all')
    },
    updateStatus(email, formData) {
        return api.callWithToken().put('/admin/update-user', formData, {
            params: {
                email
            }
        })
    }
}

export default customerServices
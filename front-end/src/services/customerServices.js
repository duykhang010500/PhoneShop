import api from './api'
const customerServices = {
    getList() {
        return api.callWithToken().get('/admin/users/all')
    }
}

export default customerServices
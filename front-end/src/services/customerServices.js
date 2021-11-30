import api from './api'
const customerServices = {
    getList() {
        return api.callWithToken().get('/admin/show_account_user')
    }
}

export default customerServices
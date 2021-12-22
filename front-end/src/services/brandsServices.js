import api from "./api"
const brandsServices = {
    getList() {
        return api.callWithToken().get('/brands')
    },
    createBrand(formData) {
        return api.callWithToken().post('/brands', formData)
    },
    deleteBrand(id) {
        return api.callWithToken().delete(`/brand?slug=${id}`)
    },
    updateBrand(id, formData) {
        return api.callWithToken().put(`/brand?slug=${id}`, formData)
    },
    getListBrandAdmin() {
        return api.callWithToken().get('/admin/brands/all')
    }
}

export default brandsServices
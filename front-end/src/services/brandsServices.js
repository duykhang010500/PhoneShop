import api from "./api"
const brandsServices = {
    getList() {
        return api.callWithToken().get('/brands')
    },
    createBrand(formData) {
        return api.callWithToken().post('/brands', formData)
    },
    deleteBrand(id) {
        return api.callWithToken().delete(`/brand?id=${id}`)
    },
    updateBrand(id, formData) {
        return api.callWithToken().put(`/brand?id=${id}`, formData)
    }
}

export default brandsServices
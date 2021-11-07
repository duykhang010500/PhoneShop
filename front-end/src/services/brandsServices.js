import api from "./api"
const brandsServices = {
    getList() {
        return api.callWithToken().get('/brand')
    },
    createBrand(formData) {
        return api.callWithToken().post('/brand', formData)
    },
    deleteBrand(id) {
        return api.callWithToken().delete(`/brand?id=${id}`)
    },
    updateBrand(id, formData) {
        return api.callWithToken().put(`/brand?id=${id}`, formData)
    }
}

export default brandsServices
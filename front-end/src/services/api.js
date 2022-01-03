import axios from 'axios'

const baseUrl = `http://localhost:8000/api`
// const baseUrl = `https://shop-phone-2022.herokuapp.com/api`

const getHeadersWithAuth = () => {
    return {
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
}

const api = {
    call: () => axios.create({
        baseURL: baseUrl
    }),
    callWithToken: () => axios.create({
        baseURL: baseUrl,
        headers: getHeadersWithAuth()
    })
}

export default api
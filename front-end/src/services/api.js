import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

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
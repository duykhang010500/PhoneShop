import {
    useEffect
} from 'react'

import {
    useHistory
} from 'react-router-dom'

import {
    useSelector
} from 'react-redux'

export const useAuthenticated = () => {
    const token = useSelector((state) => state.Auth.token)

    const history = useHistory()
    useEffect(() => {
        if (!token) {
            history.push('/login')
        }
    }, [token])
}

export const useNotAuthenticated = () => {
    const token = useSelector((state) => state.Auth.token)
    const history = useHistory()
    useEffect(() => {
        if (token) {
            history.push('/')
        }
    }, [token])
}

export const useAdmin = () => {
    // const history = useHistory()
    // const isAdmin = useSelector(state => state.Auth.currentUser.role)
    // if (!isAdmin) {
    //     return null
    // }
    // useEffect(() => {
    //     if (isAdmin != 'admin') {
    //         history.push('/')
    //     }
    // }, [isAdmin])
}
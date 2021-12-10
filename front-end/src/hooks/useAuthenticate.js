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


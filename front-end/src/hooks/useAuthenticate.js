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
    const currentUser = useSelector((state) => state.Auth.currentUser)
    const history = useHistory()
    useEffect(() => {
        if (!currentUser) {
            history.push('/login')
        }
    }, [history, currentUser])
}

export const useNotAuthenticated = () => {
    const currentUser = useSelector((state) => state.Auth.currentUser)
    const history = useHistory()
    useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, [history, currentUser])
}
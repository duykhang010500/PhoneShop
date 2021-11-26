import React from 'react'
import { Link } from 'react-router-dom'

const HeaderLogo = () => {
    return (
        <Link to="/" className="logo">
            PhoneStore
        </Link>
    )
}

export default HeaderLogo

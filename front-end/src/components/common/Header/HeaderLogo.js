import React from 'react'
import { Link } from 'react-router-dom'

const HeaderLogo = () => {
    return (
        <div className="header__menu-logo">
            <Link to="/">
                PhoneStore
            </Link>
        </div>
    )
}

export default HeaderLogo

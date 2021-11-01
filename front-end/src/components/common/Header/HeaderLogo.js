import React from 'react'
import { Link } from 'react-router-dom'

const HeaderLogo = () => {
    return (
        <Link to="/" className="logo">
            Phone <span>Store</span>
        </Link>
    )
}

export default HeaderLogo

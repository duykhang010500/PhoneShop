import { useState, useEffect } from 'react';
import HeaderTop from './HeaderTop';
import HeaderMenu from './HeaderMenu';

export default function Header() {

    const [isFixed, setIsFixed] = useState(false)

    useEffect(() => {
        const scrollFixed = () => {
            if (window.scrollY >= 50) {
                setIsFixed(true)
            } else {
                setIsFixed(false)
            }
        }
        window.addEventListener('scroll', scrollFixed)
    }, [])

    return (
        <div className={isFixed ? "header-wrapper fixed" : 'header-wrapper'}>
            <HeaderTop />
            <HeaderMenu />
        </div>
    )
}
import { useState, useEffect } from 'react';
import { Select, Input, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import {
    QuestionCircleOutlined,
    GiftOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    PhoneOutlined

} from '@ant-design/icons'

import { IoNewspaper } from "react-icons/io5";
import { useSelector } from 'react-redux';
import HeaderLogo from './HeaderLogo'
import HeaderSearch from './HeaderSearch'
import HeaderMenu from './HeaderMenu'


export default function Header() {

    const cart = useSelector(state => state.Cart.cart)

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
        console.log('scroll')
    }, [])

    const { Search } = Input

    return (
        <div className={isFixed ? "header-wrapper fixed" : 'header-wrapper'}>
            <div className="header__top">
                <div className="container">
                    <div className="header__top-wrapper">
                        <div className="header__top-selects">
                            <Select defaultValue="vnd">
                                <Select.Option key="vnd">
                                    VNĐ
                                </Select.Option>
                            </Select>
                        </div>
                        <div className="header__top-links">
                            <div className="header__top-links--item">
                                <Link to="/help">
                                    <QuestionCircleOutlined />
                                    &nbsp;Hỗ trợ
                                </Link>
                            </div>
                            <div className="header__top-links--item">
                                <Link to="/help">
                                    <GiftOutlined />
                                    &nbsp;Khuyến mại
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__menu">
                <div className="container">
                    <div className="header__menu-wrapper">
                        <div className="header__menu-logo">
                            <Link to="/">
                                PhoneStore
                            </Link>
                        </div>
                        <div className="header__menu-search">
                            <Search placeholder="Bạn cần tìm gì?" allowClear enterButton />
                        </div>
                        <div className="header__menu-actions">
                            <div className="header__menu-actions--item">
                                <Link to="/login">
                                    <IoNewspaper />&nbsp;Tin tức
                                </Link>
                            </div>
                            <div className="header__menu-actions--item">
                                <Link to="/login">
                                    <PhoneOutlined />&nbsp;Gọi mua hàng
                                </Link>
                            </div>
                            <div className="header__menu-actions--item">
                                <Link to="/login">
                                    <UserOutlined />&nbsp;Đăng nhập
                                </Link>
                                {/* <Avatar />
                                Tài khoản */}
                            </div>
                            <div className="header__menu-actions--item">
                                <Link to="/cart">
                                    <ShoppingCartOutlined />&nbsp;Giỏ hàng
                                </Link>
                                <span className="num-cart">{cart.length}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
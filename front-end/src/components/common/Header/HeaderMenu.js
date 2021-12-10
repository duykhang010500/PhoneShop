import React from 'react'
import { Dropdown, Menu, Button } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { IoNewspaper } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { actSetCurrentUser, actSetToken } from '../../../store/auth/action';
import {
    UserOutlined,
    ShoppingCartOutlined,
    MobileOutlined,
    LogoutOutlined,
    ReconciliationOutlined,
    SettingOutlined
} from '@ant-design/icons'

import HeaderSearch from './HeaderSearch';
import HeaderLogo from './HeaderLogo';

const HeaderMenu = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const cart = useSelector(state => state.Cart.cart)
    const currentUser = useSelector((state) => state.Auth.currentUser)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(actSetToken(''))
        dispatch(actSetCurrentUser(null))
        localStorage.removeItem('r')
        history.push('/')
    }

    const menuLogin = (
        <Menu style={{ marginTop: 10 }}>
            <Menu.Item key="1">
                <Button
                    style={{ width: '100%' }}
                >
                    <Link to='/login'>
                        Khách hàng
                    </Link>
                </Button>
            </Menu.Item>
            <Menu.Item key="2">
                <Button
                    style={{ width: '100%' }}
                >
                    <Link to="/login/admin">
                        Admin
                    </Link>
                </Button>
            </Menu.Item>

        </Menu>
    )

    const menu = (
        <Menu style={{ marginTop: 10 }}>
            <Menu.Item key="1">
                <Button
                    href="/user"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    icon={<UserOutlined />}
                >
                    Tài khoản
                </Button>
            </Menu.Item>
            {
                currentUser && currentUser.role == 'admin' &&
                <Menu.Item key="3">
                    <Button
                        href="/admin"
                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        icon={<SettingOutlined />}

                    >
                        Quản lý
                    </Button>
                </Menu.Item>
            }
            <Menu.Item key="2">
                <Button
                    href="/user/orders"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    icon={<ReconciliationOutlined />}
                >
                    Đơn hàng
                </Button>
            </Menu.Item>
            <Menu.Item key="3">
                <Button
                    icon={<LogoutOutlined />}
                    type="primary"
                    danger
                    style={{ width: '100%' }}
                    onClick={handleLogout}
                >
                    Đăng xuất
                </Button>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="header__menu">
            <div className="container">
                <div className="header__menu-wrapper">
                    <HeaderLogo />
                    <HeaderSearch />
                    <div className="header__menu-actions">
                        <div className="header__menu-actions--item">
                            <Link to="/products">
                                <MobileOutlined />&nbsp;Sản phẩm
                            </Link>
                        </div>
                        <div className="header__menu-actions--item">
                            <Link to="/news">
                                <IoNewspaper />&nbsp;Tin công nghệ
                            </Link>
                        </div>
                        {/* <div className="header__menu-actions--item">
                            <Link to="/login">
                                <PhoneOutlined />&nbsp;Gọi mua hàng
                            </Link>
                        </div> */}
                        <div className="header__menu-actions--item">
                            {
                                !currentUser ?
                                    <Dropdown overlay={menuLogin} placement="bottomCenter">
                                        <Link to="/login">
                                            <UserOutlined />&nbsp;Đăng nhập
                                        </Link>
                                    </Dropdown>
                                    :
                                    <Dropdown overlay={menu} placement="bottomCenter">
                                        <Link to="/login">
                                            <UserOutlined />&nbsp;Tài khoản
                                        </Link>
                                    </Dropdown>
                            }

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
    )
}

export default HeaderMenu

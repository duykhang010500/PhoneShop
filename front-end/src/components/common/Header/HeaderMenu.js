import React from 'react'
import {
    Link,
    useHistory
} from 'react-router-dom'
import {
    useSelector
} from 'react-redux'
import {
    ShoppingCartOutlined,
    MenuOutlined,
    LogoutOutlined,
    IdcardOutlined,
    FileSyncOutlined,
    NotificationOutlined,
    UserOutlined
} from '@ant-design/icons'
import {
    Menu,
    Badge,
    Dropdown,
    Avatar,
    Button,
    Typography,
    Popover,
} from 'antd'
import Cart from '../../Cart'
import {
    actSetToken,
    actSetCurrentUser
} from '../../../store/auth/action'

import {
    useDispatch,
} from 'react-redux'

const HeaderMenu = () => {

    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.Auth.currentUser)
    const cart = useSelector(state => state.Cart.cart)

    const menu = (
        <Menu>
            <Menu.Item icon={<IdcardOutlined />} key="1">
                <Link to="/user">
                    Trang cá nhân
                </Link>
            </Menu.Item>
            <Menu.Item icon={<FileSyncOutlined />} key="2">
                <Link to='/user/orders'>
                    Đơn hàng
                </Link>
            </Menu.Item>
            <Menu.Item style={{ textAlign: 'center' }} key="3">
                <Button danger onClick={handleLogout} icon={<LogoutOutlined />}>
                    Đăng xuất
                </Button>
            </Menu.Item>
        </Menu>
    )

    const history = useHistory()

    function handleLogout(e) {
        e.preventDefault()
        dispatch(actSetToken(''))
        dispatch(actSetCurrentUser(null))
        localStorage.removeItem('r')
        history.push('/')
    }


    return (

        <Menu mode="horizontal" overflowedIndicator={<MenuOutlined />}>
            <Menu.Item
                icon={<NotificationOutlined
                    className="menu-icon" />}
                key="4"
            >
                <Link to='/news'>
                    Tin tức
                </Link>
            </Menu.Item>
            {
                !currentUser ? (
                    <Menu.Item icon={<UserOutlined className="menu-icon" />} key="5">
                        <Link to="/login">
                            Đăng nhập
                        </Link>
                    </Menu.Item>
                ) :
                    (
                        <Menu.Item key="6">
                            <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                <Link to="/user">

                                    {
                                        currentUser.image ? <Avatar src={currentUser.image} /> : <Avatar icon={<UserOutlined />} />
                                    }
                                    &nbsp; <Typography.Text strong>{currentUser.name}</Typography.Text>
                                </Link>

                            </Dropdown>
                        </Menu.Item>
                    )
            }
            <Menu.Item
                icon={<Badge count={cart.length} size="small" showZero className="cart-count">
                    <ShoppingCartOutlined className="menu-icon" />
                </Badge>}
                key="7"
            >
                <Popover
                    title={`${cart.length} sản phẩm`}
                    trigger="hover"
                    content={<Cart />}
                >
                    <Link to="/cart">
                        Giỏ hàng
                    </Link>
                </Popover>
            </Menu.Item>
        </Menu>
    )
}

export default HeaderMenu
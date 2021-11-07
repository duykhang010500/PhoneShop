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

    const menu = (
        <Menu>
            <Menu.Item icon={<IdcardOutlined />}>
                <Link to="/user">
                    Trang cá nhân
                </Link>
            </Menu.Item>
            <Menu.Item icon={<FileSyncOutlined />}>

                <Link to='/user/orders'>
                    Đơn hàng
                </Link>

            </Menu.Item>
            <Menu.Item style={{ textAlign: 'center' }}>
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
        history.push('/')
    }

    const currentUser = useSelector(state => state.Auth.currentUser)
    // console.log(currentUser)

    // if (!currentUser) {
    //     return null;
    // }

    return (

        <Menu mode="horizontal" overflowedIndicator={<MenuOutlined />}>

            <Menu.Item icon={<NotificationOutlined className="menu-icon" />}>
                <Link to='/news'>
                    Tin tức
                </Link>
            </Menu.Item>
            {
                !currentUser ? (
                    <Menu.Item icon={<UserOutlined className="menu-icon" />}>
                        <Link to="/login">
                            Đăng nhập
                        </Link>
                    </Menu.Item>
                ) :
                    (
                        <Menu.Item>
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
            <Menu.Item icon={
                <Badge count={1} size="small" showZero className="cart-count">
                    <ShoppingCartOutlined className="menu-icon" />
                </Badge>
            }
            >
                <Popover
                    title={`1 sản phẩm`}
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
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
    ShoppingCartOutlined,
    ReconciliationOutlined,
    MenuOutlined,
    LogoutOutlined,
    IdcardOutlined,
    FileSyncOutlined,
    NotificationOutlined
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

const HeaderMenu = () => {

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

    function handleLogout() {
        window.location.href = "/login"
    }

    return (

        <Menu mode="horizontal" overflowedIndicator={<MenuOutlined />}>

            {/* <Menu.Item icon={<ReconciliationOutlined className="menu-icon" />}>
                <Link to='/bill'>
                    Tra cứu đơn hàng
                </Link>
            </Menu.Item> */}
            <Menu.Item icon={<NotificationOutlined className="menu-icon" />}>
                <Link to='/news'>
                    Tin tức
                </Link>
            </Menu.Item>

            {/* <Menu.Item icon={<UserOutlined className="menu-icon" />}>
                <Link to="/login">
                    Đăng nhập
                </Link>
            </Menu.Item> */}

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
            <Menu.Item>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>

                    {/* <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                            K
                        </Avatar> */}
                    <Link to="/user">
                        <Avatar src="https://image.lag.vn/upload/news/19/08/09/yasuo-bi-game-thu-phan-doi__1__LYDS.jpg" />
                        &nbsp; <Typography.Text strong>Duy Khang</Typography.Text>
                    </Link>

                </Dropdown>
            </Menu.Item>
        </Menu>

    )
}

export default HeaderMenu

import { Link } from 'react-router-dom'
import {
    ShoppingCartOutlined,
    ReconciliationOutlined,
    MenuOutlined,
    LogoutOutlined,
    IdcardOutlined,
    FileSyncOutlined,
    UserOutlined,
    
} from '@ant-design/icons'
import {
    Row,
    Col,
    Input,
    Menu,
    Badge,
    Dropdown,
    Avatar,
    Button,
} from 'antd'

import { useHistory } from 'react-router'

const { Search } = Input

export default function Header() {
    
    const menu = (
        <Menu>
            <Menu.Item icon={<IdcardOutlined />}>
                <Link>
                    Trang cá nhân
                </Link>
            </Menu.Item>
            <Menu.Item icon={<FileSyncOutlined />}>
                <Link>
                    Đơn hàng
                </Link>
            </Menu.Item>
            <Menu.Item style={{textAlign: 'center'}}>
                <Button danger onClick={handleLogout} icon={<LogoutOutlined />}>
                    Đăng xuất
                </Button>
            </Menu.Item>
        </Menu>
    );

    const history = useHistory()

    function handleLogout(){
        history.push('/login')
    }

    return (
       <header>
            <div className="header-wrapper">
                <div className="container">
                    <header className="header">
                        <Row justify="space-between" align="middle" gutter={[10, 10]}>
                            <Col
                                md={4}
                                xs={22}
                            >
                                <Link to="/" className="logo">
                                    Phone<span>Shop</span>
                                </Link>
                            </Col>
                            <Col
                                md={10}
                                xs={24}
                            >
                                <Search
                                    size="middle"
                                    placeholder="Nhập tên sản phẩm cần tìm..."
                                    enterButton
                                    // loading
                                    allowClear
                                />
                            </Col>
                            <Col
                                md={10}
                                xs={2}
                            >
                                
                                    <Menu mode="horizontal" overflowedIndicator={<MenuOutlined />}>
                                       
                                            <Menu.Item icon={<ReconciliationOutlined className="menu-icon" />}>
                                                <Link to='/bill'>
                                                    Đơn hàng
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item icon={
                                                <Badge count={1} size="small" showZero className="cart-count">
                                                    <ShoppingCartOutlined className="menu-icon" />
                                                </Badge>
                                            }
                                            >
                                                <Link to="/cart">
                                                    Giỏ hàng
                                                </Link>
                                            </Menu.Item>
                                            {/* <Menu.Item icon={<UserOutlined className="menu-icon" />}>
                                                <Link to="/login">
                                                    Đăng nhập
                                                </Link>
                                            </Menu.Item> */}
                                            <Menu.Item>
                                                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                                    <Link>
                                                        {/* <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                                                            K
                                                        </Avatar> */}
                                                         <Avatar src="https://image.lag.vn/upload/news/19/08/09/yasuo-bi-game-thu-phan-doi__1__LYDS.jpg"/>
                                                        &nbsp; Khang Yasou
                                                    </Link>
                                                </Dropdown>
                                            </Menu.Item>
                                        
                                    </Menu>
                                
                            </Col>
                        </Row>
                    </header>
                </div>
            </div>
       </header>

    )
}
import React, { useState } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import './style.less'
import {
    Layout,
    Menu,
    Row,
    Col,
    Button
} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CodeSandboxOutlined,
    DashboardOutlined,
    ReconciliationOutlined,
    NotificationOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import { RiCoupon4Line } from "react-icons/ri";

import { useSelector, useDispatch } from 'react-redux'
import DashboardAdminRoutes from './DashboardAdminRoutes';
import { actSetCurrentUser, actSetToken } from '../../store/auth/action';
const { Header, Sider, Content } = Layout;

const DashboardAdmin = () => {


    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { SubMenu } = Menu
    const currentUser = useSelector(state => state.Auth.currentUser)
    if (!currentUser) {
        return null
    }

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(actSetToken(''))
        dispatch(actSetCurrentUser(null))
        localStorage.removeItem('r')
        history.push('/')
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={isCollapsed}
                width={240}
            >
                <div className="logo">
                    {/* Phone Shop */}
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                    <Menu.Item
                        key="/admin"
                        icon={<DashboardOutlined
                        // style={{ fontSize: "2rem" }}
                        />}>
                        <Link to='/admin'>Tổng quan</Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title="Sản phẩm"
                        icon={<CodeSandboxOutlined
                            style={{ fontSize: "2rem" }}
                        />}
                    >
                        <Menu.Item key="/admin/categories">
                            <Link to='/admin/categories'>Quản lý hãng</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/products" >
                            <Link to='/admin/products'>Quản lý sản phẩm</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        key="/admin/orders"
                        icon={<ReconciliationOutlined
                            style={{ fontSize: "2rem" }}
                        />}>
                        <Link to='/admin/orders'>Quản lý đơn hàng</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="/admin/coupon"
                        icon={<RiCoupon4Line
                            style={{ fontSize: "2rem" }}
                        />}>
                        <Link to='/admin/coupons'>
                            Quản lý khuyến mại
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="news"
                        title="Tin tức"
                        icon={<NotificationOutlined
                            style={{ fontSize: "2rem" }}
                        />}
                    >
                        <Menu.Item key="/admin/news/category">
                            <Link to='/admin/news/category'>Quản lý chủ đề</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/news/posts" >
                            <Link to='/admin/news/posts'>Quản lý bài viết</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        key="/admin/customer"
                        icon={<UserOutlined
                            style={{ fontSize: "2rem" }}
                        />}>
                        <Link to='/admin/customer'>
                            Quản lý khách hàng
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Row justify="space-between">
                        <Col>
                            {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setIsCollapsed(!isCollapsed),
                            })}
                        </Col>
                        <Col pull={1}>
                            <Button
                                danger
                                icon={<LogoutOutlined />}
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </Button>
                        </Col>
                    </Row>
                </Header>
                <Content
                    className="site-layout-background box-sd1"
                    style={{
                        padding: 24,
                    }}
                >
                    <DashboardAdminRoutes />
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashboardAdmin

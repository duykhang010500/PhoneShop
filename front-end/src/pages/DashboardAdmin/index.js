import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import './style.less'
import {
    Layout,
    Menu,
    Avatar,
    Badge,
    Row,
    Space,
    Col,
    Typography
} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CodeSandboxOutlined,
    DashboardOutlined,
    ReconciliationOutlined,
    NotificationOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { RiCoupon4Line } from "react-icons/ri";
import DashboardAdminRoutes from './DashboardAdminRoutes';
import { useDispatch, useSelector } from 'react-redux'
import { actGetListOrdersUserAsync } from '../../store/orders/action';
import { useAdmin } from '../../hooks/useAuthenticate';

const { Header, Sider, Content } = Layout;

const DashboardAdmin = () => {

    useAdmin()
    const location = useLocation()

    const [isCollapsed, setIsCollapsed] = useState(false)
    const { SubMenu } = Menu
    const currentUser = useSelector(state => state.Auth.currentUser)
    if (!currentUser) {
        return null
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={isCollapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                    <Menu.Item
                        key="/admin"
                        icon={<DashboardOutlined
                            style={{ fontSize: "2rem" }}
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
                        key="/admin/customer"
                        icon={<UserOutlined
                            style={{ fontSize: "2rem" }}
                        />}>
                        <Link to='/admin/customer'>
                            Quản lý khách hàng
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key="/admin/coupon"
                        icon={<RiCoupon4Line
                            style={{ fontSize: "2rem" }}
                        />}>
                        <Link to='/admin/coupon'>
                            Quản lý khuyến mại
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="/admin/news"
                        icon={<NotificationOutlined
                            style={{ fontSize: "2rem" }}
                        />}>
                        Quản lý tin tức
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Row
                        justify="space-between"
                    >
                        <Col>
                            {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setIsCollapsed(!isCollapsed),
                            })}
                        </Col>
                        <Col
                            pull={1}
                        >
                            <Space size="large">
                                <Badge
                                // dot
                                >
                                    <Space>
                                        <Avatar
                                            shape="circle"
                                            icon={<UserOutlined />}
                                        />
                                        <Typography.Text strong>
                                            {
                                                currentUser.name
                                            }
                                        </Typography.Text>
                                    </Space>

                                </Badge>
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <DashboardAdminRoutes />
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashboardAdmin

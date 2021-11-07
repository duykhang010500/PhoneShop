import React from 'react'

import DashboardUserRoutes from './DashboardUserRoutes'
import {
    Menu,
    Col,
    Row
} from 'antd'

import {
    useLocation,
    Link
} from 'react-router-dom'

import {
    ReconciliationOutlined,
    UserOutlined,
    LockOutlined
} from '@ant-design/icons';

const DashboardUser = () => {

    const location = useLocation()
    return (
        <div className="container"
            style={{ marginTop: "2rem" }}
        >
            <Row>
                <Col
                    xs={8}
                    md={6}
                >
                    <Menu
                        style={{ width: 256 }}
                        selectedKeys={[location.pathname]}
                        mode="inline"
                    >
                        <Menu.Item
                            key="/user"
                            icon={<UserOutlined style={{ fontSize: "2rem" }} />}
                        >
                            <Link
                                to='/user'>
                                Thông tin tài khoản
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key="/user/orders"
                            icon={<ReconciliationOutlined style={{ fontSize: "2rem" }} />}
                        >
                            <Link
                                to='/user/orders'>
                                Đơn hàng của bạn
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='/user/password'
                            icon={<LockOutlined style={{ fontSize: "2rem" }} />}
                        >
                            <Link
                                to='/user/password'>
                                Đổi mật khẩu
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Col>

                <Col
                    xs={16}
                    md={18}
                >
                    <DashboardUserRoutes />
                </Col>
            </Row>
        </div>
    )
}

export default DashboardUser

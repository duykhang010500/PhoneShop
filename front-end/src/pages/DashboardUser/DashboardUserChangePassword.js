import React from 'react'
import {
    Form,
    Input,
    Col,
    Row,
    Button
} from 'antd'

import {
    LockOutlined
} from '@ant-design/icons'

const DashboardUserChangePassword = () => {
    return (
        <div
            style={{
                backgroundColor: "#fff",
                padding: "3rem"
            }}
        >
            <Form
                layout="vertical"
            >
                <Row>
                    <Col
                        span={12}
                    >
                        <Form.Item
                            label="Mật khẩu hiện tại"
                            name="password"
                            rules={[

                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"

                            />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu mới"
                            name="repassword"
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"

                            />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu mới"

                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"

                            />
                        </Form.Item>
                        <Form.Item

                        >
                            <Button
                                type="primary"
                                loading
                            >
                                Đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default DashboardUserChangePassword

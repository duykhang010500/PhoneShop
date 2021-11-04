import React, { useState } from 'react'
import {
    useDispatch
} from 'react-redux'
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
import { actChangePassword } from '../../store/auth/action'



const DashboardUserChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = (formData) => {
        setIsLoading(true)
        dispatch(actChangePassword(formData)).then(() => {
            setIsLoading(false)
        })
    }

    return (
        <div
            style={{
                backgroundColor: "#fff",
                padding: "3rem"
            }}
        >
            <Form
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Row>
                    <Col
                        span={12}
                    >
                        <Form.Item
                            label="Mật khẩu hiện tại"
                            name="old_password"
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
                            name="new_password"
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"

                            />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu mới"
                            name="new_password_confirmation"
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"

                            />
                        </Form.Item>
                        <Form.Item

                        >
                            <Button
                                htmlType="submit"
                                type="primary"
                                loading={isLoading}
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

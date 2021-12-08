import React, { useState } from 'react'
import {
    useDispatch
} from 'react-redux'
import {
    Form,
    Input,
    Col,
    Row,
    Button,
    message
} from 'antd'

import {
    LockOutlined,
    SaveOutlined
} from '@ant-design/icons'
import { actChangePassword } from '../../store/auth/action'
import { useAuthenticated } from '../../hooks/useAuthenticate'


const DashboardUserChangePassword = () => {
    useAuthenticated()

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = (formData) => {
        setIsLoading(true)
        dispatch(actChangePassword(formData)).then((res) => {
            if (res.ok) {
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }).finally(() => setIsLoading(false))
    }

    return (
        <div
            className="box-sd1"
            style={{
                backgroundColor: "#fff",
                padding: "3rem"
            }}
        >
            <Form
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Row justify="center">
                    <Col
                        span={9}
                    >
                        <Form.Item
                            label="Mật khẩu hiện tại"
                            name="old_password"
                            rules={[
                                {
                                    min: 6,
                                    message: 'Mật khẩu hiện tại phải từ 6 ký tự'
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu hiện tại!'
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu mới"
                            name="new_password"
                            hasFeedback
                            rules={[
                                {
                                    min: 6,
                                    message: 'Mật khẩu mới phải từ 6 ký tự!'
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu mới!'
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu mới"
                            name="new_password_confirmation"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui xác nhận lại mật khẩu mới!'
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('new_password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu xác nhận không giống!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                loading={isLoading}
                                size="large"
                                icon={<SaveOutlined />}
                                style={{ width: '100%' }}
                            >
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default DashboardUserChangePassword

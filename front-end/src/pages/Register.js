import React, { useState } from 'react'
import {
    useDispatch
} from 'react-redux'

import {
    useHistory
} from 'react-router-dom'

import {
    Form,
    Input,
    Button,
    Typography,
    Row,
    Col,
    message,
} from 'antd'

import {
    MailOutlined,
    LockOutlined,
    UserOutlined
} from '@ant-design/icons'

import {
    actRegister
} from '../store/auth/action'
import { useNotAuthenticated } from '../hooks/useAuthenticate'

const Register = () => {
    useNotAuthenticated()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const handleSubmit = (formData) => {
        setIsLoading(true)
        dispatch(actRegister(formData)).then((res) => {
            if (res.ok) {
                message.success('Tạo tài khoản thành công')
                history.push('/login')
            } else {
                message.error(res.message)
            }
        }).finally(() => setIsLoading(false))
    }

    return (
        <div className="container register-page">
            <Form
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    Đăng ký
                </Typography.Title>
                <Row gutter={[40, 16]}>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form.Item
                            name="name"
                            label="Họ và tên"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ và tên của bạn!',
                                },
                                {
                                    min: 6,
                                    message: 'Họ và tên phải từ 5 ký tự!'
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                size="large"
                                allowClear
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input
                                prefix={<MailOutlined />}
                                size="large"
                                allowClear
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                                {
                                    min: 6,
                                    message: 'Mật khẩu phải từ 6 ký tự trở lên!'
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
                            name="password_confirmation"
                            label="Nhập lại mật khẩu"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lại mật khẩu!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
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
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={isLoading}
                        >
                            Đăng ký
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Register

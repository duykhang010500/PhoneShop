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
} from 'antd'

import {
    MailOutlined,
    LockOutlined,
    UserOutlined
} from '@ant-design/icons'

import {
    actRegister
} from '../store/auth/action'

const Register = () => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (formData) => {
        setIsLoading(true)
        dispatch(actRegister(formData)).then(() => {
            setIsLoading(false)
        })
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
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your full name!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                size="large"
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
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"
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
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                size="large"
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

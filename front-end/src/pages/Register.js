import React, { useState } from 'react'
import {
    Form,
    Input,
    Button,
    Typography,
    Row,
    Col,
    Checkbox,
} from 'antd'

const Register = () => {

    const formItemLayout = {
        labelCol: {
            xs: { span: 8 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 16 },
            sm: { span: 16 },
        },
    };

    const initState = {
        email: '',
        password: '',
        repassword: ''
    }

    const [formData, setFormData] = useState(initState)

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className="register-page">
            <Form {...formItemLayout}>
                <Typography.Title level={2} style={{ textAlign: 'center' }}>
                    Đăng ký
                </Typography.Title>
                <Form.Item

                    name="fullname"
                    label="Họ và tên"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your full name!',
                        },
                    ]}
                >
                    <Input />
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Number Phone!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
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
                    <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ sm: { span: 16, offset: 8 } }}>
                    <Checkbox>
                        Đồng ý với các điều khoản sử dụng!
                    </Checkbox>
                </Form.Item>
                <Row>
                    <Col
                        xs={{ span: 24 }}
                        sm={{ span: 16, offset: 8 }}
                    >
                        <Button type="primary" htmlType="submit" size="large">
                            Đăng ký
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Register

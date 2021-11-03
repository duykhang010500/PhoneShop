import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actLogin } from '../store/auth/action'

import {
    Form,
    Input,
    Button,
    message,
    Typography
} from 'antd'

import { Link, useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export default function Login() {
    message.config({
        top: 70,
        maxCount: 1,
        duration: 2
    })
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (values) => {
        setIsLoading(true)
        dispatch(actLogin(values)).then(() => {
            setIsLoading(false)
            message.success('Đăng nhập thành công!')
            history.push('/')
        })
    }


    return (
        <div className="login-page">
            <h1 className="login__title">
                Đăng nhập
            </h1>
            <Form
                name="login-form"
                className="login-form"
                size="large"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                >
                    <Input
                        prefix={<UserOutlined
                            className="site-form-item-icon" />}
                        placeholder="Email"
                        type="email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={isLoading}
                    >
                        Đăng nhập
                    </Button>
                    Hoặc <Link to='/register'>
                        <Typography.Text type="danger" strong>
                            Đăng ký ngay
                        </Typography.Text>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    )
}
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actAdminLogin } from '../store/auth/action'

import {
    Form,
    Input,
    Button,
    message
} from 'antd'

import { useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNotAuthenticated } from '../hooks/useAuthenticate'

export default function Login() {

    useNotAuthenticated()
    const history = useHistory()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (values) => {
        setIsLoading(true)
        dispatch(actAdminLogin(values)).then(res => {
            if (res.ok) {
                message.success(res.message)
                history.push('/admin')
            } else {
                message.error(res.message)
            }
        }).finally(() => setIsLoading(false))
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
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!'
                        },
                        // {
                        //     type: "email",
                        //     message: 'Email không hợp lệ'
                        // }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined
                            className="site-form-item-icon" />}
                        placeholder="Email"
                        type="email"
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                        // {
                        //     min: 6,
                        //     message: 'Mật khẩu phải ít nhất 6 ký tự'
                        // }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                        allowClear
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
                </Form.Item>
            </Form>
        </div>
    )
}
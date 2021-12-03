import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actLogin } from '../store/auth/action'

import {
    Form,
    Input,
    Button,
    Typography,
    message
} from 'antd'

import { Link, useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNotAuthenticated } from '../hooks/useAuthenticate'

export default function Login() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const [form] = Form.useForm()

    const handleSubmit = (values) => {
        setIsLoading(true)
        dispatch(actLogin(values)).then((res) => {
            if (res.ok) {
                history.push('/')
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setIsLoading(false)
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
                form={form}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email!'
                        },
                        {
                            type: "email",
                            message: 'Email không hợp lệ'
                        }
                    ]}
                >
                    <Input
                        placeholder="Email"
                        prefix={<UserOutlined />}
                        type="email"
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    }, {
                        min: 6,
                        message: 'Mật khẩu phải ít nhất 6 ký tự'
                    }]}
                >
                    <Input
                        placeholder="Mật khẩu"
                        prefix={<LockOutlined />}
                        type="password"
                        allowClear
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        loading={isLoading}
                        htmlType="submit"
                        style={{ width: '100%', marginBottom: 10 }}
                    >
                        Đăng nhập
                    </Button>
                    Hoặc <Link to='/register'>
                        <Typography.Text
                            type="danger"
                            strong
                            style={{ fontSize: 16 }}
                        >
                            Đăng ký ngay
                        </Typography.Text>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    )
}
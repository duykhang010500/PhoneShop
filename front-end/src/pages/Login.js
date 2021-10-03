import { useState } from 'react'
import {
    Form,
    Input,
    Button,
    message
} from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export default function Login() {
    message.config({
        top: 70,
        maxCount: 1,
        duration: 5
    })
    function handleSubmit(){
        message.success('Đăng nhập thành công!')
        setIsLoading(true)
    }

    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className="login-page">
            <h1 className="login__title">
                Đăng nhập
            </h1>
            <Form
                name="normal_login"
                className="login-form"
                size="large"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
                >
                    <Input
                        prefix={<UserOutlined
                        className="site-form-item-icon" />}
                        placeholder="Tài khoản"
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
                    onClick={handleSubmit}
                    >
                        Đăng nhập
                    </Button>
                    Hoặc <Link href="/register">Đăng ký ngay!</Link>
                </Form.Item>
            </Form>
        </div>
    )
}
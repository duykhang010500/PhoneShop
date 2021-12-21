import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actFetchMe, actLogin, actSetToken } from '../store/auth/action'

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
import GoogleLogin from '../components/GoogleLoginButton'

export default function Login() {

    const qs = window.location.search


    useNotAuthenticated()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const [form] = Form.useForm()

    useEffect(() => {
        if (qs) {
            fetch(`http://localhost:8000/api/google/callback${qs}`)
                .then((res) => res.json())
                .then(data => {
                    dispatch(actSetToken(data.token))
                    dispatch(actFetchMe())
                        .then(() => {
                            message.success('Đăng nhập thành công!')
                            history.push('/')
                        })
                })
        } else {
            console.log('huhu')
        }
    }, [])


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
                        // {
                        //     type: "email",
                        //     message: 'Email không hợp lệ'
                        // }
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
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        }
                    ]}
                >
                    <Input
                        placeholder="Mật khẩu"
                        prefix={<LockOutlined />}
                        type="password"
                        allowClear
                    />
                </Form.Item>
                <Link
                    to='/forgot-password'
                    style={{ fontSize: 14, textAlign: 'right', display: 'block' }}

                >
                    <Typography.Text
                        type="danger"
                        strong
                        style={{ fontSize: 14, textAlign: 'right' }}

                    >
                        Quên mật khẩu?
                    </Typography.Text>
                </Link>


                <Form.Item>
                    <Button
                        type="primary"
                        loading={isLoading}
                        htmlType="submit"
                        className='mt-1'
                        style={{ width: '100%', marginBottom: 10 }}
                    >
                        Đăng nhập
                    </Button>
                    <Typography.Text style={{ textAlign: 'center', display: 'block' }}>
                        Hoặc &nbsp;
                    </Typography.Text>
                    <GoogleLogin />
                    <Typography.Text>
                        Đây là lần sử dụng đầu tiên của bạn? &nbsp;
                    </Typography.Text>
                    <Link to='/register'>
                        <Typography.Text
                            type="danger"
                            strong
                            style={{ fontSize: 16 }}
                        >
                            Hãy tạo tài khoản mới
                        </Typography.Text>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    )
}
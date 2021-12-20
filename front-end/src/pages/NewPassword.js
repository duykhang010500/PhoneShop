import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { LockFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { actResetPasswordAsync } from '../store/auth/action'
import { Link, useHistory } from 'react-router-dom'

const NewPassword = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const qs = window.location.search
    const urlParams = new URLSearchParams(qs)

    const handleSubmit = async (formValues) => {
        try {
            setIsLoading(true)
            await dispatch(actResetPasswordAsync(urlParams.get('token'), formValues))
            setIsLoading(false)
            message.success('Đổi mật khẩu thành công, vui lòng đăng nhập lại!')
            history.push('/login')
        } catch (err) {
            setIsLoading(false)
        }
    }
    return (
        <div className="forgot-password-page mt-12 container">

            <Form
                className='forgot-password-form'
                onFinish={handleSubmit}
            >
                <div className="title mb-2 fs-16 fw-500">
                    Nhập mật khẩu mới của bạn!
                </div>
                <Form.Item
                    name='password'
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 6, message: 'Mật khẩu phải có từ 6 ký tự trở lên!' }
                    ]}
                >
                    <Input.Password
                        size='large'
                        prefix={<LockFilled />} />
                </Form.Item>
                <Button
                    htmlType='submit'
                    className='btn-forgot'
                    type='primary'
                    danger
                    size='large'
                    loading={isLoading}
                >
                    Tiếp tục
                </Button>

            </Form>

        </div>
    )
}

export default NewPassword

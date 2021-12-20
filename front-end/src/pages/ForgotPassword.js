import { useState } from 'react'
import { Button, Form, Input, message, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { actSendMailResetPassword } from '../store/auth/action'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const handleSubmit = async (formValues) => {
        console.log('Submit: ', formValues)
        try {

            setIsLoading(true)
            await dispatch(actSendMailResetPassword(formValues.email))
            setEmail(formValues.email)
            setIsLoading(false)

        } catch (err) {
            setIsLoading(false)
            message.error('Có lỗi xảy ra, vui long kiểm tra lại email!')
        }
    }
    return (
        <div className='forgot-password-page mt-12 container'>
            {
                email ? <div className="forgot-password-form fs-16">

                    <Link to='/login'>
                        <ArrowLeftOutlined className='forgot-password-back' />
                    </Link>

                    Vui lòng truy cập email "<span className='fw-500'>{email}</span>" để đặt lại mật khẩu!
                </div> :
                    <Form
                        className='forgot-password-form'
                        onFinish={handleSubmit}
                    >
                        <Link to='/login'>
                            <ArrowLeftOutlined className='forgot-password-back' />
                        </Link>
                        <div className="forgot-form-title">
                            Nhập email của bạn để đặt lại mật khẩu!
                        </div>
                        <Form.Item
                            name='email'
                            rules={[
                                { required: true, message: 'Vui lòng nhập địa chỉ email!' }

                            ]}
                        >
                            <Input
                                placeholder='Nhập địa chỉ email của bạn!'
                                size='large'
                                prefix={<MailOutlined />}

                            />
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
            }
        </div>
    )
}

export default ForgotPassword

import {
    Button,
    Form,
    Input,
    message,
    Table,
    Steps
} from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actTrackingOrderAsync } from '../store/orders/action'

const OrderTracking = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isShowStatus, setIsShowStatus] = useState(false)
    const dispatch = useDispatch()


    const handleSubmit = (formValues) => {
        // console.log(formValues)
        setIsLoading(true)
        dispatch(actTrackingOrderAsync(formValues))
            .then((res) => {
                if (res.ok) {
                    setIsShowStatus(true)
                    message.success(res.message)
                } else {
                    setIsShowStatus(false)
                    message.error(res.message)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const order = useSelector(state => state.Orders.trackingOrder)

    return (
        <div className='container mt-12'>
            <div
                className='fs-16 fw-500 text-center mb-3'
            >KIỂM TRA TRÌNH TRẠNG ĐƠN HÀNG
            </div>
            <div
                className='d-flex-center mb-3'
            >
                <Form
                    layout='inline'
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label='Mã đơn hàng'
                        name='order_code'
                        rules={[
                            { required: true, message: 'Nhập mã đơn hàng!' }
                        ]}
                    >
                        <Input
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Số điện thoại'
                        name='phone'
                        rules={[
                            { required: true, message: 'Nhập số điện thoại!' }
                        ]}
                    >
                        <Input
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            size='large'
                            loading={isLoading}
                            htmlType='submit'
                        >
                            Tra cứu
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {
                isShowStatus &&
                <div
                    style={{ maxWidth: 500, margin: '0 auto' }}
                >
                    <Steps
                        size='small'
                        current={order.status - 1}
                        progressDot
                        responsive
                    >
                        <Steps.Step title="Đang chờ xử lý" />
                        <Steps.Step title="Đang vận chuyển" />
                        <Steps.Step title="Đã hoàn thành" />
                    </Steps>
                </div>
            }
        </div>
    )
}

export default OrderTracking

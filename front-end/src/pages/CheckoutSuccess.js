import React, { useState, useEffect } from 'react'
import { Result, Spin } from 'antd';
import { useDispatch } from 'react-redux'
import { actMakeNewOrder } from '../store/orders/action'
import { actDeleteCart } from '../store/cart/action';

const CheckoutSuccess = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const urlString = window.location.href
    const url = new URL(urlString)
    const vnpayCode = url.searchParams.get('vnp_TransactionNo')

    useEffect(() => {
        const myOrders = JSON.parse(localStorage.getItem('newOrders'))
        const newOrders = { ...myOrders, method: `VNPAY - Mã GD: ${vnpayCode}` }
        dispatch(actMakeNewOrder(newOrders))
            .then(() => {
                setIsLoading(false)
                dispatch(actDeleteCart())
                localStorage.removeItem('newOrders')
            })

    }, [dispatch])


    return (
        <div style={{ marginTop: '13rem' }}>
            {
                isLoading ? <Spin
                    tip='Đang xử lý đơn hàng!'
                    spinning
                    size='large'
                >
                    <div style={{ marginBottom: 100 }}></div>
                </Spin> :
                    <Result
                        status="success"
                        title={`Thanh toán VNPAY thành công! `}
                        subTitle={`Mã giao dịch ${vnpayCode}`}
                    />
            }
        </div>
    )
}

export default CheckoutSuccess

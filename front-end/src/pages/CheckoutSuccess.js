import React from 'react'
import { Result } from 'antd';

const CheckoutSuccess = () => {
    return (
        <div style={{ marginTop: '13rem' }}>
            <Result
                status="success"
                title="Thanh toán VNPAY thành công!"
            />
        </div>
    )
}

export default CheckoutSuccess

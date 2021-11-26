import React from 'react'
import { Result, Button } from 'antd';

const OrderSuccess = () => {
    return (
        <Result
            status="success"
            title="Đặt hàng thành công"
            subTitle=""
            extra={[
                <Button type="primary" key="console" href="/user/orders">
                    Xem đơn hàng
                </Button>,
                <Button key="buy" href="/">
                    Tiếp tục mua hàng
                </Button>,
            ]}
        />
    )
}

export default OrderSuccess

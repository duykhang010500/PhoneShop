import React from 'react'
import {
    Empty,
    Button,
    Space,
    Typography,
    Row,
    Divider,
    Avatar,
    Col
} from 'antd'

import {
    ShoppingCartOutlined,
    CreditCardOutlined,
    DeleteOutlined


} from '@ant-design/icons'

const Cart = () => {

    function handleDelete() {
        console.log('Delete')
    }

    return (
        <div className="cart">
            {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
            <Row
                justify="space-between"
                align="top"
                style={{ marginBottom: "1rem" }}

            >
                <Col span={8}>
                    <Avatar
                        size="large"
                        shape="square"
                        src="https://cdn.tgdd.vn/Products/Images/42/249427/xiaomi-11-lite-5g-ne-pink-600x600.jpg"
                    />
                </Col>
                <Col span={14}>
                    <Typography.Text strong>Điện thoại Xiaomi 11 Lite 5G NE</Typography.Text>
                </Col>
                <Col span={2}>
                    <DeleteOutlined
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={handleDelete}
                    />
                </Col>
            </Row>

            <Divider />
            <Space
                direction="vertical"
                style={{ width: "100%" }}
            >
                <Row
                    justify="space-between"
                >
                    <Typography.Text
                        strong
                    >
                        Tổng tiền:
                    </Typography.Text>
                    <Typography.Text
                        strong
                        type="danger"
                        style={{ fontSize: "1.6rem" }}

                    >
                        10000000đ
                    </Typography.Text>
                </Row>
                <Button
                    style={{ width: "100%", backgroundColor: "#40a9ff", border: "none" }}
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    href="/cart"
                >

                    Đến giỏ hàng

                </Button>
                <Button
                    style={{ width: "100%", backgroundColor: "#fa8c16", border: "none" }}
                    danger
                    type="primary"
                    icon={<CreditCardOutlined />}
                    size="large"
                >
                    Thanh toán ngay
                </Button>
            </Space>
        </div>

    )
}

export default Cart

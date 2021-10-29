import React from 'react'
import {
    Button,
    Col,
    InputNumber,
    Row,
    Space,
    Breadcrumb,
    Typography,
    Avatar
} from 'antd'

import {
    HomeOutlined,
    DeleteOutlined,
    ShoppingCartOutlined,
    CreditCardOutlined
} from '@ant-design/icons'

const Cart = () => {
    return (

        <div className="container cart-page">
            <Breadcrumb
                style={{
                    margin: '2rem 0',
                    backgroundColor: "#fff",
                    display: "inline-block",
                    padding: "1rem 2rem",
                    borderRadius: "3rem"
                }}

            >
                <Breadcrumb.Item href="/">
                    <HomeOutlined style={{ fontSize: '2rem' }} />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/dien-thoai-di-dong">
                    <Typography.Text strong>Giỏ hàng</Typography.Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Typography.Title
                level={4}
            >
                Giỏ hàng của bạn có 2 sản phẩm
            </Typography.Title>
            <Row
                justify="space-between"
                className="cart-item"
                align="middle"
            >
                <Col>
                    <Avatar
                        src="https://cdn.tgdd.vn/Products/Images/42/241265/realme-c21y-black-600x600.jpg"
                        size="large"
                        shape="square"
                    />

                </Col>
                <Col>
                    Iphone 12 Pro Max 256Gb
                </Col>
                <Col>
                    <Typography.Text>
                        100000
                    </Typography.Text>
                </Col>
                <Col>
                    <InputNumber
                        min={1}
                        max={10}
                        // value={2}
                        size="large"
                        defaultValue={1}
                        style={{ border: "1px solid silver" }}
                    />
                </Col>
                <Col>
                    20000000đ
                </Col>
                <Col>
                    <Button
                        icon={<DeleteOutlined />}
                        size="large"
                        danger
                    >
                        Xóa
                    </Button>
                </Col>
            </Row>


            <Row
                justify="center"
                className="cart-total-price"
                align="middle"
            >
                <Col>
                    <Typography.Text
                        strong
                    >
                        Tổng tiền: &nbsp;
                    </Typography.Text>
                    <Typography.Text
                        type="danger"
                        strong
                    >
                        10000000đ
                    </Typography.Text>
                </Col>
            </Row>
            <Row
                justify="center"
            >
                <Space>
                    <Button
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        type="dashed"
                        href="/"
                    >
                        Tiếp tục mua hàng
                    </Button>
                    <Button
                        size="large"
                        danger
                        type="primary"
                        icon={<CreditCardOutlined />}
                    >
                        Thực hiện thanh toán
                    </Button>
                </Space>
            </Row>

        </div>

    )
}

export default Cart

import React, { useEffect, useState } from 'react'
import {
    Button,
    Col,
    InputNumber,
    Row,
    Space,
    Breadcrumb,
    Typography,
    Avatar,
    Tooltip
} from 'antd'

import { Link } from 'react-router-dom'

import {
    HomeOutlined,
    DeleteOutlined,
    ShoppingCartOutlined,
    CreditCardOutlined
} from '@ant-design/icons'

import { useSelector, useDispatch } from 'react-redux'
import { actDeleteCart, actDeleteItem, actUpdateItem } from '../store/cart/action'
import { convertNewPrice, formatVND } from '../helpers/priceFormat'

const Cart = () => {

    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState(0)
    const cart = useSelector(state => state.Cart.cart)

    const handleChangeQuantity = (value, idProduct) => {
        dispatch(actUpdateItem(idProduct, value))
    }

    useEffect(() => {
        const totalPrice = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (convertNewPrice(item.price * item.quantity, item.discount))
            }, 0)
            setTotalPrice(total)
        }
        totalPrice()
    }, [cart])

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
            <Row justify="space-between" style={{ marginBottom: '2rem' }}>
                <Col>
                    <Typography.Title level={4}>
                        {
                            `Giỏ hàng của bạn có ${cart.length} sản phẩm`
                        }
                    </Typography.Title>
                </Col>
            </Row>
            <Row style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '1rem', fontWeight: 500 }}>
                <Col span={10}>
                    Sản phẩm
                </Col>
                <Col span={4}>
                    Đơn giá
                </Col>
                <Col span={4}>
                    Số lượng
                </Col>
                <Col span={4}>
                    Thành tiền
                </Col>
                <Col span={2}>
                    <Button
                        icon={<DeleteOutlined />}
                        size="middle"
                        danger
                        shape="circle"
                        onClick={() => dispatch(actDeleteCart())}
                    >
                    </Button>
                </Col>
            </Row>

            {
                cart.map((item, index) => {
                    return (
                        <Row
                            key={index}
                            className="cart-item"
                            align="middle"
                        >
                            <Col span={4}>
                                <Avatar
                                    src={item.image}
                                    size="large"
                                    shape="square"
                                />

                            </Col>
                            <Col span={6}>
                                <Typography.Text
                                    strong
                                    style={{ fontSize: "1.6rem" }}
                                >
                                    {item.name}
                                </Typography.Text>
                            </Col>
                            <Col span={4}>
                                <Space direction="vertical">
                                    <Typography.Text
                                        strong
                                        type="danger"
                                    >
                                        {formatVND(item.price)}
                                    </Typography.Text>
                                    <Typography.Text style={{ fontSize: '1.3rem', fontWeight: '500' }}>
                                        Giảm {item.discount} %
                                    </Typography.Text>
                                </Space>
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={1}
                                    max={10}
                                    onChange={(value) => handleChangeQuantity(value, item.id)}
                                    size="large"
                                    defaultValue={item.quantity}
                                    style={{ border: "1px solid silver" }}
                                />
                            </Col>
                            <Col span={4}>
                                <Typography.Text strong type="danger">
                                    {
                                        formatVND(item.quantity * (convertNewPrice(item.price, item.discount)))
                                    }
                                </Typography.Text>
                            </Col>

                            <Col span={2}>
                                <Tooltip title="Xóa khỏi giỏ hàng">
                                    <Button
                                        icon={<DeleteOutlined />}
                                        size="middle"
                                        danger
                                        shape="circle"
                                        onClick={() => dispatch(actDeleteItem(item.id))}
                                    >
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Row>
                    )
                })
            }
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
                        {formatVND(totalPrice)}

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
                        <Link to='/checkout'>
                            Thực hiện thanh toán
                        </Link>
                    </Button>
                </Space>
            </Row>

        </div>

    )
}

export default Cart

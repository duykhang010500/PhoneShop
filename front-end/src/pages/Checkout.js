import React from 'react'
import {
    Breadcrumb,
    Typography,
    Row,
    Col,
    Form,
    Button,
    Input,
    Select,
    Radio,
    Space,
    Card,
    Avatar,
    Badge,
    Divider
} from 'antd'

import Underline from '../components/common/Underline'



import {
    HomeOutlined,
    MailOutlined,
    UserOutlined,
    PhoneOutlined,
    FileOutlined,
    EditOutlined
} from '@ant-design/icons'


const Checkout = () => {
    const { Option } = Select
    const { Meta } = Card
    return (
        <div className="container checkout-page">
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
                    <Typography.Text strong>
                        Thanh toán
                    </Typography.Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row
                gutter={[32, 16]}
            >
                <Col span={14}
                >
                    <Typography.Title
                        level={3}
                    >
                        Thông tin nhận hàng
                    </Typography.Title>
                    <Underline />
                    <Form
                        layout="vertical"
                        className="checkout-form"
                    >
                        <Row
                            gutter={[16, 16]}
                        >
                            <Col span={12}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<MailOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Họ và tên"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Số điên thoại"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<PhoneOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item name="province" label="Tỉnh/Thành phố" rules={[{ required: true }]}>
                                    <Select
                                        size="large"
                                        allowClear
                                    >
                                    </Select>
                                </Form.Item>
                                <Form.Item name="province" label="Quận/Huyện" rules={[{ required: true }]}>
                                    <Select
                                        size="large"
                                        allowClear
                                    >
                                    </Select>
                                </Form.Item>
                                <Form.Item name="province" label="Phường/Xã" rules={[{ required: true }]}>
                                    <Select
                                        size="large"
                                        allowClear
                                    >
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Ghi chú"
                                >
                                    <Input.TextArea
                                        size="large"
                                        showCount
                                        maxLength={100}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Vận chuyển"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input
                                        size="large"
                                        defaultValue="Chuyển phát nhanh, miễn phí"
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col
                    span={10}
                    className="checkout-total"
                >
                    <Row
                        direction="horizontal"
                        align="middle"
                        justify="space-between"
                    >
                        <Typography.Title
                            level={3}
                        >
                            Thông tin đơn hàng
                        </Typography.Title>
                        <Button
                            type="link"
                            danger
                            style={{ fontSize: "1.5rem", fontWeight: "600" }}
                            href="/cart"
                            icon={<EditOutlined />}
                        >
                            Chỉnh sửa
                        </Button>
                    </Row>
                    <Underline />
                    <Row>
                        <Col span={24}>
                            <Card
                                style={{ width: "100%" }}
                            >
                                <Meta
                                    avatar={
                                        <Badge
                                            count={1}
                                            size="small"
                                        >
                                            {/* <Avatar
                                                size="large"
                                                shape="square"
                                                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/thumbnail/220x175/9df78eab33525d08d6e5fb8d27136e95/m/a/macbook-air-gold-select-201810_4.jpg"
                                            /> */}
                                            <Avatar
                                                size="large"
                                                shape="square"
                                                src="https://cdn.tgdd.vn/Products/Images/42/249427/xiaomi-11-lite-5g-ne-pink-600x600.jpg"
                                            />
                                        </Badge>
                                    }
                                    // title="Iphone 5"
                                    title=" Điện thoại Xiaomi 11 Lite 5G NE"
                                    description={<>
                                        <Typography.Text
                                            style={{ display: "block" }}
                                        >
                                            Số lượng: 1
                                        </Typography.Text>
                                        <Typography.Text
                                            strong
                                            style={{ fontSize: "1.6rem" }}
                                            type="danger"
                                        >
                                            {/* 5000000đ */}
                                            1000000đ
                                        </Typography.Text>
                                    </>
                                    }
                                />
                            </Card>
                        </Col>
                        <Divider />
                        <Col span={24}
                            style={{
                                backgroundColor: "#fff",
                                padding: "2rem"
                            }}
                        >
                            <Typography.Title
                                level={3}
                            >
                                Đặt hàng
                            </Typography.Title>
                            <Underline />
                            <Space
                                size="middle"
                                direction="vertical"
                                style={{ width: "100%" }}
                            >
                                <Row
                                    // size="large"
                                    justify="space-between"
                                    wrap={false}
                                >
                                    <Input
                                        placeholder="Nhập mã khuyến mại"
                                        size="large"
                                        style={{ width: "75%" }}
                                        prefix={<FileOutlined />}
                                    />
                                    <Button
                                        type="primary"
                                        size="large"
                                    >
                                        Áp dụng
                                    </Button>
                                </Row>

                                <Row
                                    justify="space-between"
                                >
                                    <Col>
                                        <Typography.Text
                                            strong

                                        >
                                            Tạm tính
                                        </Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >
                                            10000000đ
                                        </Typography.Text>

                                    </Col>
                                </Row>
                                <Row
                                    justify="space-between"
                                >
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >
                                            Khuyến mại
                                        </Typography.Text>

                                    </Col>
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >90000đ
                                        </Typography.Text>

                                    </Col>
                                </Row>
                                <Row
                                    justify="space-between"
                                >
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >
                                            Phí vận chuyển
                                        </Typography.Text>

                                    </Col>
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >
                                            Miễn phí
                                        </Typography.Text>

                                    </Col>
                                </Row>
                                <Row
                                    justify="space-between"
                                >
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >Tổng cộng
                                        </Typography.Text>

                                    </Col>
                                    <Col>
                                        <Typography.Text
                                            strong
                                            type="danger"
                                            style={{ fontSize: "2rem" }}
                                        >10000000đ
                                        </Typography.Text>

                                    </Col>
                                </Row>
                                <Button
                                    size="large"
                                    type="dashed"
                                    style={{ width: "100%" }}
                                >
                                    Đặt hàng ngay
                                </Button>
                                <Row
                                    justify="center"
                                >
                                    <Typography.Text
                                        strong
                                        type="danger"
                                    >
                                        Vui lòng kiểm tra kỹ lại đơn hàng trước khi đặt mua!
                                    </Typography.Text>
                                </Row>
                            </Space>

                        </Col>

                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Checkout

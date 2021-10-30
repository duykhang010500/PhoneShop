import {
    Row,
    Col,
    Space,
    Typography,
    Radio,
    Button,
    Tooltip
} from 'antd'

import {
    HeartFilled,
    HeartOutlined
} from '@ant-design/icons'

import { CheckCircleTwoTone } from '@ant-design/icons'
export default function DetailProductInfo() {
    return (
        <Row gutter={[40, 40]}>
            <Col md={10} xs={24}>
                <img src="https://hoanghamobile.com/i/preview/Uploads/2020/10/10/iphone%2011%20(3).png" alt="" />
            </Col>
            <Col md={14} xs={24}>
                <Space direction="vertical" size="middle">
                    <Space size="middle">
                        <Typography.Title level={4} type="danger">
                            30.000.000đ
                        </Typography.Title>
                        <Typography.Text strong italic>
                            <del>Giá niêm yết: 30.000.000đ</del>
                        </Typography.Text>
                    </Space>

                    <Typography.Text strong>
                        <i class="fas fa-shipping-fast"></i>
                        &nbsp;
                        Miễn phí vận chuyển toàn quốc
                    </Typography.Text>
                    <Tooltip title="Xóa khỏi danh sách yêu thích">
                        <HeartFilled
                            style={{ color: "#FF4136", fontSize: "3rem" }}
                            onClick={() => console.log('Xóa khỏi danh sách yêu thích')}
                        />
                    </Tooltip>
                    <Tooltip title="Thêm vào danh sách yêu thích">
                        <HeartOutlined
                            style={{ color: "#FF4136", fontSize: "3rem" }}
                            onClick={() => console.log('Thêm vào danh sách yêu thích')}
                        />
                    </Tooltip>


                    <Typography.Text strong>
                        Lựa chọn phiên bản
                    </Typography.Text>

                    <Radio.Group defaultValue="a" size="middle">
                        <Space size="middle">
                            <Radio.Button value="a">
                                64GB
                            </Radio.Button>
                            <Radio.Button value="b">
                                256GB
                            </Radio.Button>
                            <Radio.Button value="c">
                                512GB
                            </Radio.Button>
                        </Space>
                    </Radio.Group>

                    <Typography.Text strong>
                        Lựa chọn màu sắc
                    </Typography.Text>

                    <Radio.Group defaultValue="h" size="middle">
                        <Space size="middle">
                            <Radio.Button value="h">
                                Đỏ
                            </Radio.Button>
                            <Radio.Button value="g" >
                                Đen
                            </Radio.Button>
                        </Space>
                    </Radio.Group>
                    <Space direction="vertical">
                        <Typography.Text strong>
                            KHUYẾN MÃI
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Tặng gói iCloud 50GB miễn phí 3 tháng
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Giảm ngay 20% Ốp lưng chính hãng khi mua kèm iPhone
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Giảm đến 300.000đ khi mua bảo hành (rơi vỡ + vào nước) kèm máy
                        </Typography.Text>
                    </Space>
                    <Space size="large">
                        <Button type="primary" size="large" danger>
                            Mua ngay
                        </Button>
                        <Button type="primary" size="large">
                            Thêm vào giỏ hàng
                        </Button>
                    </Space>

                </Space>
            </Col>
        </Row>
    )
}
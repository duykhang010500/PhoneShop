
import { React, useState } from 'react'
import {
    Row,
    Col,
    Space,
    Progress,
    Rate,
    Button,
    Typography,
    Divider,
    message
} from 'antd'

import { IoMdPaperPlane } from "react-icons/io";
import DetailProductRatingForm from './DetailProductRatingForm';
import { useSelector } from 'react-redux';

export default function DetailProductRating() {
    const [showFormRating, setShowFormRating] = useState(false)

    const product = useSelector(state => state.Products.detailProduct)
    if (!product) {
        return null
    }
    return (
        <>
            <Row gutter={[20, 20]} align="middle" justify='space-between'>
                <Col span={24}>
                    <Typography.Title level={5}>
                        Đánh giá và nhận xét {product.data.name}
                    </Typography.Title>
                </Col>
                <Col xs={24} md={8}>
                    <Row justify="space-around" gutter={[20, 20]}>
                        <Space direction="vertical" align="center" size="small">
                            <Typography.Title level={5}>
                                Điểm trung bình
                            </Typography.Title>
                            <Typography.Text strong style={{ fontSize: 30 }}>
                                {product.star_avg || 0}
                                <Rate disabled value={1} count={1} style={{ fontSize: 30, marginBottom: 10 }} />
                            </Typography.Text>
                            <Typography.Text strong>
                                {
                                    product.data.ratings.length ?
                                        <span>{product.data.ratings.length} lượt đánh giá</span>
                                        :
                                        <span>Chưa có đánh giá nào</span>
                                }
                            </Typography.Text>
                        </Space>
                    </Row>
                </Col>
                <Col xs={24} md={10}>
                    <Space direction="vertical">
                        <Space>
                            <Typography.Text>
                                5
                            </Typography.Text>
                            <Rate count={1} value={1} disabled style={{ fontSize: "1.4rem" }} />
                            <div style={{ width: 200 }}>
                                <Progress percent={(product.five_star / product.data.ratings.length) * 100} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                        <Space>
                            <Typography.Text>
                                4
                            </Typography.Text>
                            <Rate count={1} value={1} disabled style={{ fontSize: "1.4rem" }} />
                            <div style={{ width: 200 }}>
                                <Progress percent={(product.four_star / product.data.ratings.length) * 100} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                        <Space>
                            <Typography.Text>
                                3
                            </Typography.Text>
                            <Rate count={1} value={1} disabled style={{ fontSize: "1.4rem" }} />
                            <div style={{ width: 200 }}>
                                <Progress percent={(product.three_star / product.data.ratings.length) * 100} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                        <Space>
                            <Typography.Text>
                                2
                            </Typography.Text>
                            <Rate count={1} value={1} disabled style={{ fontSize: "1.4rem", marginLeft: 1 }} />
                            <div style={{ width: 200 }}>
                                <Progress percent={(product.two_star / product.data.ratings.length) * 100} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                        <Space>
                            <Typography.Text style={{ marginLeft: 2 }}>
                                1
                            </Typography.Text>
                            <Rate count={1} value={1} disabled style={{ fontSize: "1.4rem", marginLeft: 3 }} />
                            <div style={{ width: 200 }}>
                                <Progress percent={(product.one_star / product.data.ratings.length) * 100} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                    </Space>
                </Col>
                <Col xs={24} md={6}>
                    <Row justify="space-around">
                        {
                            showFormRating ?
                                <Button
                                    type="primary"
                                    danger
                                    size="large"
                                    onClick={() => setShowFormRating(!showFormRating)}>
                                    Đóng
                                </Button>
                                :
                                <Button
                                    type="primary"
                                    danger
                                    size="large"
                                    icon={<IoMdPaperPlane
                                        style={{ fontSize: 18 }} />}
                                    onClick={() => {
                                        if (!localStorage.getItem('access_token')) {
                                            message.error('Vui lòng đăng nhập để sử dụng tín năng này!')
                                            return
                                        } else {
                                            setShowFormRating(!showFormRating)
                                        }
                                    }}
                                >
                                    &nbsp; Gửi đánh giá của bạn
                                </Button>
                        }
                    </Row>
                </Col>
            </Row>
            <Divider />
            <DetailProductRatingForm showFormRating={showFormRating} />
        </>
    )
}

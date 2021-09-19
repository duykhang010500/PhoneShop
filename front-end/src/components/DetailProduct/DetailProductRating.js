
import { React, useState } from 'react'
import {
    Row,
    Col,
    Space,
    Progress,
    Rate,
    Button,
    Typography,
    Divider
} from 'antd'

import { IoMdPaperPlane } from "react-icons/io";
import DetailProductRatingForm from './DetailProductRatingForm';

export default function DetailProductRating() {
    const [showFormRating, setShowFormRating] = useState(false)

    return (
        <>
            <Row gutter={[10, 10]} align="middle">
                <Col xs={24} md={8}>
                    <Row justify="space-around">
                        <Space direction="vertical" align="center" size={1}>
                            <Typography.Title level={4}>
                                Điểm trung bình
                            </Typography.Title>
                            <Typography.Text>
                                3.7
                                <Rate disabled value={1} count={1} style={{ fontSize: 30, marginBottom: 10}} />
                            </Typography.Text>
                            <Typography.Text strong>
                                N lượt đánh giá
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
                                <Progress percent={50} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                        <Space>
                            <Typography.Text>
                                4
                            </Typography.Text>
                            <Rate count={1} value={1} disabled style={{ fontSize: "1.4rem" }} />
                            <div style={{ width: 200 }}>
                                <Progress percent={50} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                        <Space>
                            <Typography.Text>
                                3
                            </Typography.Text>
                            <Rate count={1} value={1} disabled style={{ fontSize: "1.4rem" }} />
                            <div style={{ width: 200 }}>
                                <Progress percent={50} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                        <Space>
                            <Typography.Text>
                                2
                            </Typography.Text>
                            <Rate count={1} value={1} disabled style={{ fontSize: "1.4rem" }} />
                            <div style={{ width: 200 }}>
                                <Progress percent={50} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                        <Space>
                            <Typography.Text>
                                1
                            </Typography.Text>
                            <Rate count={1} value={1} disabled style={{ fontSize: "1.4rem" }} />
                            <div style={{ width: 200 }}>
                                <Progress percent={50} size="small" status="active" showInfo={false} />
                            </div>
                        </Space>
                    </Space>
                </Col>
                <Col xs={24} md={6}>
                    <Row justify="space-around">
                        <Button
                            on
                            danger
                            type="primary"
                            size="large"
                            icon={<IoMdPaperPlane
                                style={{ fontSize: 18 }} />}
                            onClick={() => { setShowFormRating(!showFormRating) }}
                        >
                            &nbsp; Gửi đánh giá của bạn
                        </Button>
                    </Row>
                </Col>
            </Row>
            <Divider style={{ border: "none" }} />
            <DetailProductRatingForm showFormRating={showFormRating} />
            <Divider />
        </>
    )
}

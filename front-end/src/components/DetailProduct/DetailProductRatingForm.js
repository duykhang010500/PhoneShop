
import React, { useState } from 'react'
import {
    Row,
    Col,
    Space,
    Typography,
    Rate,
    Input,
    message,
    Button
} from 'antd'

export default function DetailProductRatingForm({ showFormRating }) {
    const[str, setStr] = useState('')
    const[star, setStar] = useState(0)

    
    function handleChangeStar(e) {
        setStar(e)
    }
    
    function handleChangeInput(e) {
        console.log(e)
        setStr(e.target.value)
    }
    
    function handleSubmit() {
        console.log(star)
        console.log(str)
        setStar(0)
        setStr('')
    }

    return (
        <>
            {
                showFormRating &&
                <Row align="middle" gutter={[10, 10]}>
                    <Col xs={24} md={8}>
                        <Space
                            direction="vertical"
                            size="small"
                            align="center">
                            <Typography.Title level={4}>
                                Bạn đánh giá như thế nào?
                            </Typography.Title>
                            <Rate
                                onChange={handleChangeStar}
                                value={star}
                            />
                        </Space>
                    </Col>
                    <Col xs={24} md={16}>
                        <Input.TextArea
                            allowClear
                            maxLength={200}
                            showCount
                            rows={3}
                            value={str}
                            onChange={handleChangeInput}
                        />
                        <Button
                            type="primary"
                            size="middle"
                            style={{ marginTop: 10 }}
                            onClick={handleSubmit}
                        >
                            Gửi ngay
                        </Button>
                    </Col>

                </Row>
            }
        </>
    )
}

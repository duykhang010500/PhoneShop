
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
import { useDispatch } from 'react-redux'
import { IoMdPaperPlane } from "react-icons/io";
import { actRatingProductAsync } from '../../store/products/actions';


export default function DetailProductRatingForm({ product, showFormRating }) {

    const dispatch = useDispatch()
    const [str, setStr] = useState('')
    const [star, setStar] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    console.log('product in rating', product)
    function handleChangeStar(e) {
        setStar(e)
    }

    function handleChangeInput(e) {
        console.log(e)
        setStr(e.target.value)
    }

    function handleSubmit() {
        const formData = { star, content: str }
        console.log(formData)
        setIsLoading(true)

        dispatch(actRatingProductAsync(product.id, formData))
            .finally(() => {
                setIsLoading(false)
                setStar(0)
                setStr('')
            })
    }

    return (
        <>
            {
                showFormRating &&
                <Row align="top" gutter={[10, 10]}>
                    <Col xs={24} md={8} push={1}>
                        <Space
                            direction="vertical"
                            size="small"
                            align="center"
                        >
                            <Typography.Title level={5}>
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
                            danger
                            type="primary"
                            size="large"
                            style={{ marginTop: 10 }}
                            icon={<IoMdPaperPlane />}
                            onClick={handleSubmit}
                            loading={isLoading}
                        >
                            &nbsp;
                            Gửi ngay
                        </Button>
                    </Col>

                </Row>
            }
        </>
    )
}

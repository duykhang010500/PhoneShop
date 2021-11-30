
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

    console.log('product in rating', product)
    function handleChangeStar(e) {
        setStar(e)
    }

    function handleChangeInput(e) {
        console.log(e)
        setStr(e.target.value)
    }

    function handleSubmit() {
        console.log('đánh giá product có id là: ', product.id)
        // console.log(star)
        // console.log(str)
        const form = {}
        const formData = { ...form, star, content: str }
        console.log(formData)


        dispatch(actRatingProductAsync(product.id, formData))
        // setStar(0)
        // setStr('')
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
                            danger
                            type="primary"
                            size="large"
                            style={{ marginTop: 10 }}
                            icon={<IoMdPaperPlane />}
                            onClick={handleSubmit}

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

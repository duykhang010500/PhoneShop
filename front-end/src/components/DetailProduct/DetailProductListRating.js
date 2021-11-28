
import React from 'react'
import {
    Comment,
    Typography,
    Rate,
    Avatar,
    Col,
    Row
} from 'antd'
export default function DetailProductListRating({ product }) {
    return (
        <Row>
            {
                product.ratings.length != 0 ?
                    product.ratings.map((item, idx) => {
                        return (
                            <Col
                                span={24}
                                key={idx}
                            >
                                <Comment

                                    author={
                                        <Typography.Text strong>
                                            User
                                        </Typography.Text>
                                    }
                                    avatar={
                                        <Avatar
                                            src="https://image.lag.vn/upload/news/19/08/09/yasuo-bi-game-thu-phan-doi__1__LYDS.jpg"
                                            alt="Khang Duy"
                                        />
                                    }
                                    content={
                                        <>
                                            <Rate style={{ display: "block", fontSize: 13 }} disabled value={item.star} />
                                            <Typography.Text style={{ fontSize: 16 }}>
                                                {item.content}
                                            </Typography.Text>
                                        </>
                                    }
                                />
                            </Col>
                        )
                    }) :
                    <span>Chưa có ai đánh giá, hãy là người đầu tiên</span>
            }
        </Row>

    )
}

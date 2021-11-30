
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
                                            {item.user_name}
                                        </Typography.Text>
                                    }
                                    avatar={
                                        <Avatar
                                            src={item.user_image}
                                        />
                                    }
                                    content={
                                        <>
                                            <Rate style={{ display: "block", fontSize: 13 }} disabled value={item.star} />
                                            <Typography.Text>
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

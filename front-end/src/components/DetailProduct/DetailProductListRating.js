
import React from 'react'
import {
    Comment,
    Typography,
    Rate,
    Avatar,
    Col,
} from 'antd'
import { useSelector } from 'react-redux'
export default function DetailProductListRating() {
    const product = useSelector((state) => state.Products.detailProduct)
    if (!product) {
        return null
    }
    return (
        <div className="box-sd1 p-2">
            {
                product.data.ratings.length != 0 ?
                    product.data.ratings.map((item, idx) => {
                        return (
                            <Col
                                span={24}
                                key={idx}
                            >
                                <Comment
                                    datetime={item.created_at}
                                    author={
                                        <Typography.Text strong>
                                            {item.user_name}
                                        </Typography.Text>
                                    }
                                    avatar={
                                        <img
                                            src={item.user_image}
                                            alt={item.user_image}
                                            style={{ width: 40, height: 40 }}
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
                                {/* <Divider /> */}
                            </Col>
                        )
                    }) :
                    <span className="fs-16">Chưa có ai đánh giá, hãy là người đầu tiên cảm nhận 😊</span>
            }
        </div>

    )
}

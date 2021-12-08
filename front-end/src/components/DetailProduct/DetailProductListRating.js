
import React from 'react'
import {
    Comment,
    Typography,
    Rate,
    Avatar,
    Col,
    Row,
    Divider
} from 'antd'
export default function DetailProductListRating({ product }) {
    return (
        <div className="box-sd1 p-2">
            {
                product.ratings.length != 0 ?
                    product.ratings.map((item, idx) => {
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
                                {/* <Divider /> */}
                            </Col>
                        )
                    }) :
                    <span className="fs-16">Chưa có ai đánh giá, hãy là người đầu tiên cảm nhận 😊</span>
            }
        </div>

    )
}

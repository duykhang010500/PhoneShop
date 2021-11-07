
import React from 'react'
import {
    Comment,
    Typography,
    Rate,
    Avatar
} from 'antd'
export default function DetailProductListRating() {
    return (
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
                    <Rate style={{ display: "block", fontSize: 14 }} disabled value={5} />
                    <Typography.Text strong>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure), to help people create their product prototypes beautifully
                        and efficiently.
                    </Typography.Text>
                </>
            }
        />
    )
}

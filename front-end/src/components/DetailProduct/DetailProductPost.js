import React from 'react'
import {
    Typography
} from 'antd'

export default function DetailProductPost({ product }) {
    return (
        <div>
            <Typography.Title level={4}>
                Bài viết đánh giá
            </Typography.Title>
            <Typography.Paragraph>
                {
                    product.desc ? product.desc : 'Đang cập nhật'
                }
            </Typography.Paragraph>
        </div>
    )
}

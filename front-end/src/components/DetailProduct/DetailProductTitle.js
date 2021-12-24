import React from 'react'
import { useSelector } from 'react-redux'

import {
    Space,
    Breadcrumb,
    Typography,
    Rate
} from 'antd'

import { HomeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'


export default function DetailProductTitle() {

    const selector = useSelector((state) => state)
    const product = selector.Products.detailProduct
    if (!product) {
        return null
    }

    return (
        <Space direction="vertical">
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <HomeOutlined /> Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item >
                    <Link to="/products">Điện thoại di động</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Typography.Text strong>
                        {product.data.brand.name}
                    </Typography.Text>
                </Breadcrumb.Item>
            </Breadcrumb>

            <Space size="large">
                <Space size="middle" wrap>
                    <div className="detail__product-name">
                        {product.data.name}
                    </div>
                    <Space>
                        {
                            product.data.ratings.length != 0 ?
                                <Rate
                                    allowHalf
                                    disabled
                                    value={product.star_avg || 0}
                                    style={{ fontSize: "1.4rem" }} /> :
                                <Rate
                                    disabled
                                    value={0}
                                    style={{ fontSize: "1.4rem" }}

                                />
                        }
                        <Typography.Text strong>
                            {product.data.ratings.length} đánh giá
                        </Typography.Text>
                    </Space>
                </Space>
            </Space>
        </Space>
    )
}
import React from 'react'
import Carousel from '../Carousel'
import {
    Row,
    Typography,
    Tag,
    Button,
    Select,
    Space
} from 'antd'

import { UnorderedListOutlined } from '@ant-design/icons'

import ProductByCategoy from '../ProductByCategoy'
const CategoryListProduct = () => {
    const TagChecked = ['Apple', 'Samsung']
    return (
        <div className="list__filter">
            <div className="list__filter-title">
                <Typography.Title level={4}>
                    Điện thoại (40 sản phẩm)
                </Typography.Title>
                <Row align="middle">
                    <span>
                        Lọc theo: &nbsp;
                    </span>
                    {
                        TagChecked.map((item, index) => {
                            return (
                                <Tag
                                    closable
                                    key={index}
                                    color="red">
                                    {item}
                                </Tag>
                            )
                        })
                    }
                </Row>
            </div>
            <div className="list__filter-product">
                <Row justify="space-between" align="middle">
                    <Space>
                        <UnorderedListOutlined style={{ fontSize: "2rem" }} />
                    </Space>
                    <Select defaultValue="0" style={{ width: 170 }}>
                        <Select.Option value="0">Sắp xếp theo</Select.Option>
                        <Select.Option value="lucy">Giá tăng dần</Select.Option>
                        <Select.Option value="Yiminghe">Giá giảm dần</Select.Option>
                    </Select>
                </Row>
                <ProductByCategoy />
                <Row justify="center">
                    <Button type="danger" style={{ marginTop: '1.5rem' }}>
                        Tải thêm
                    </Button>
                </Row>
            </div>
        </div>

    )
}

export default CategoryListProduct

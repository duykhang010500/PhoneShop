import React from 'react'
import Carousel from '../Carousel'
import {
    Col,
    Row,
    Typography,
    Breadcrumb,
} from 'antd'

import { HomeOutlined } from '@ant-design/icons'
import CategoryFilter from './CategoryFilter'
import CategoryListProduct from './CategoryListProduct'


const Category = () => {

    return (
        <div className="container" style={{ marginTop: '2rem' }}>
            <Breadcrumb style={{ marginBottom: '1rem' }}>
                <Breadcrumb.Item href="/">
                    <HomeOutlined style={{ fontSize: '2rem' }} />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/dien-thoai-di-dong">
                    <Typography.Text strong>Điện thoại di động</Typography.Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Carousel />
            <div className="category-container">
                <Row gutter={[40, 40]}>
                    <Col xs={8} md={6}>
                        <CategoryFilter />
                    </Col>
                    <Col xs={16} md={18}>
                        <CategoryListProduct />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Category

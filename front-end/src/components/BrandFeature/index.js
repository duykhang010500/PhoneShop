import React from 'react'
import {
    Row,
    Col,
    Typography,
    Card
} from 'antd'
import Underline from '../common/Underline'

const BrandFeature = () => {
    return (
        <div className="container">
            <Typography.Title
                level={4}

            >
                THƯƠNG HIỆU NỔI BẬT
            </Typography.Title>
            <Underline />
            <Row>
                <Col
                    xs={24}
                    md={6}
                >
                    <Card
                        cover={
                            <img
                                src="https://images.samsung.com/is/image/samsung/assets/vn/about-us/brand/logo/mo/360_197_1.png?$FB_TYPE_B_PNG$"
                            />
                        }
                    >
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default BrandFeature

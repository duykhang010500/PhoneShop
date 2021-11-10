import React from 'react'
import {
    Row,
    Col,
    Typography,
} from 'antd'
import Underline from '../common/Underline'
import {
    Link
} from 'react-router-dom'

const BrandFeature = () => {
    return (
        <div className="container brand-feature">
            <Typography.Title
                level={4}
            >
                THƯƠNG HIỆU NỔI BẬT
            </Typography.Title>
            <Underline />
            <Row
                gutter={[12, 12]}
            >
                <Col
                    xs={24}
                    md={6}
                >
                    <Link to="" className="banner-item">
                        <img

                            src="https://cellphones.com.vn/media/icons/banner/banner-sis-apple-homepage.png"
                        />
                    </Link>
                </Col>
                <Col
                    xs={24}
                    md={6}
                >
                    <Link to="" className="banner-item">
                        <img

                            src="https://cellphones.com.vn/media/icons/banner/banner-sis-samsung-homepage.png"
                        />
                    </Link>
                </Col>
                <Col
                    xs={24}
                    md={6}
                >
                    <Link to="" className="banner-item">
                        <img
                            className="banner-item"
                            src="https://cellphones.com.vn/media/icons/banner/banner-sis-asus-homepage.png"
                        />
                    </Link>
                </Col>
                <Col
                    xs={24}
                    md={6}
                >
                    <Link to="" className="banner-item">
                        <img
                            className="banner-item"
                            src="https://cellphones.com.vn/media/icons/banner/banner-sis-xiaomi-homepage.png"
                        />
                    </Link>
                </Col>
            </Row>
        </div>
    )
}

export default BrandFeature

import React from 'react'
import {
    Divider,
    Row,
    Typography,
    Col
} from 'antd';
import DetailProductTitle from '../components/DetailProduct/DetailProductTitle';
import DetailProductInfo from '../components/DetailProduct/DetailProductInfo';
import DetailProductWarranty from '../components/DetailProduct/DetailProductWarranty';
import DetailProductPost from '../components/DetailProduct/DetailProductPost';
import DetailProductTechnical from '../components/DetailProduct/DetailProductTechnical';
import DetailProductRating from '../components/DetailProduct/DetailProductRating';
import DetailProductListRating from '../components/DetailProduct/DetailProductListRating';

export default function DetailProduct() {
    return (
        <section className="detail__product">
            <div className="container">
                <DetailProductTitle />
                <Divider />
                <Row>
                    <Col xs={24} md={18}>
                        <DetailProductInfo />
                    </Col>

                    <Col xs={24} md={6}>
                        <DetailProductWarranty />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={[40, 40]}>
                    <Col xs={24} md={14}>
                        <DetailProductPost />
                    </Col>
                    <Col xs={24} md={10}>
                        <DetailProductTechnical />
                    </Col>
                </Row>
                <Divider />

                <Typography.Title level={4}>
                    Đánh giá và nhận xét Iphone Xs Max 256GB
                </Typography.Title>
                <Divider style={{border: "none"}}/>

                <DetailProductRating />

                <Row>
                    <DetailProductListRating />
                </Row>

            </div>
        </section>
    )
}

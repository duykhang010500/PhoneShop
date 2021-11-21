import React, { useEffect } from 'react'
import {
    Divider,
    Row,
    Typography,
    Col
} from 'antd';
import {
    useParams
} from 'react-router-dom'
import {
    useDispatch, useSelector
} from 'react-redux'
import DetailProductTitle from '../components/DetailProduct/DetailProductTitle';
import DetailProductInfo from '../components/DetailProduct/DetailProductInfo';
import DetailProductWarranty from '../components/DetailProduct/DetailProductWarranty';
import DetailProductPost from '../components/DetailProduct/DetailProductPost';
import DetailProductTechnical from '../components/DetailProduct/DetailProductTechnical';
import DetailProductRating from '../components/DetailProduct/DetailProductRating';
import DetailProductListRating from '../components/DetailProduct/DetailProductListRating';
import { actGetDetailProductAsync } from '../store/products/actions';

export default function DetailProduct() {

    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actGetDetailProductAsync(id))
    }, [dispatch, id])

    const product = useSelector(state => state.Products.detailProduct)

    if (!product) {
        return (
            <div>Đang chờ</div>
        )
    } else {
        return (
            <section className="detail__product">
                <div className="container">
                    <DetailProductTitle product={product} />
                    <Divider />
                    <Row>
                        <Col xs={24} md={18}>
                            <DetailProductInfo product={product} />
                        </Col>

                        <Col xs={24} md={6}>
                            <DetailProductWarranty />
                        </Col>
                    </Row>
                    <Divider />
                    <Row gutter={[40, 40]}>
                        <Col xs={24} md={14}>
                            <DetailProductPost product={product} />
                        </Col>
                        <Col xs={24} md={10}>
                            <DetailProductTechnical product={product} />
                        </Col>
                    </Row>
                    <Divider />
                    <Typography.Title level={4}>
                        Đánh giá và nhận xét Iphone Xs Max 256GB
                    </Typography.Title>
                    <Divider style={{ border: "none" }} />
                    <DetailProductRating />
                    <Row>
                        <DetailProductListRating />
                    </Row>
                </div>
            </section>
        )
    }
}

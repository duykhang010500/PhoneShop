import React, { useEffect, useState } from 'react'
import {
    Divider,
    Row,
    Typography,
    Col,
    Skeleton
} from 'antd';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DetailProductTitle from '../components/DetailProduct/DetailProductTitle';
import DetailProductInfo from '../components/DetailProduct/DetailProductInfo';
import DetailProductWarranty from '../components/DetailProduct/DetailProductWarranty';
import DetailProductPost from '../components/DetailProduct/DetailProductPost';
import DetailProductTechnical from '../components/DetailProduct/DetailProductTechnical';
import DetailProductRating from '../components/DetailProduct/DetailProductRating';
import DetailProductListRating from '../components/DetailProduct/DetailProductListRating';
import { actGetDetailProductAsync } from '../store/products/actions';
import { actGetMyWishListAsync } from '../store/wishList/action';
import RelatedProductList from '../components/RelatedProductList';

export default function DetailProduct() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsFetching(true)
        dispatch(actGetDetailProductAsync(id)).then(() => {
            setIsFetching(false)
        })
        dispatch(actGetMyWishListAsync())
    }, [dispatch, id])


    const product = useSelector(state => state.Products.detailProduct)
    const myWishList = useSelector(state => state.WishList)

    if (!product) {
        return null
    }


    if (isFetching) {
        return (
            <div className="container" style={{ marginTop: 140, marginBottom: 200 }}>
                <Row gutter={[20, 20]}>
                    <Col span={18}>
                        <Row gutter={[20, 20]}>
                            <Col span={24}>
                                <Skeleton.Input
                                    style={{ width: 450 }}
                                />
                            </Col>
                            <Col span={10}>
                                <Row gutter={[10, 10]}>
                                    <Col span={24}>
                                        <Skeleton.Image style={{ height: 300, width: 350 }} />
                                    </Col>
                                    <Col span={6}>
                                        <Skeleton.Image style={{ width: 60, height: 60 }} />
                                    </Col>
                                    <Col span={6}>
                                        <Skeleton.Image style={{ width: 60, height: 60 }} />
                                    </Col>
                                    <Col span={6}>
                                        <Skeleton.Image style={{ width: 60, height: 60 }} />
                                    </Col>
                                    <Col span={6}>
                                        <Skeleton.Image style={{ width: 60, height: 60 }} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={14}>
                                <Skeleton
                                    active
                                    paragraph={{ rows: 10 }}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Skeleton
                            active
                            paragraph={{ rows: 10 }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }



    return (
        <div className="container">
            <section className="detail__product">
                <div className="detail-info">
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
                </div>
                <RelatedProductList productSlug={product.slug} />
                <Row gutter={[15, 15]}>
                    <Col xs={24} md={14}>
                        <div className="detail-post">
                            <DetailProductPost product={product} />
                        </div>
                    </Col>
                    <Col xs={24} md={10}>
                        <div className="detail-technical">
                            <DetailProductTechnical product={product} />
                        </div>
                    </Col>
                </Row>
                <Divider />
                <div className="box-sd1 p-2 bg-white">
                    <Typography.Title level={4}>
                        Đánh giá và nhận xét {product.name}
                    </Typography.Title>

                    <DetailProductRating product={product} />
                </div>

                <div className="bg-white mt-2">
                    <DetailProductListRating product={product} />
                    {/* <DetailProductListRating product={product} /> */}

                </div>

            </section>
        </div>
    )
}


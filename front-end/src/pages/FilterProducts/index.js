import React, { useEffect, useState } from 'react'
import { Button, Row, Typography, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actFilterProductAsync } from '../../store/products/actions'
import ProductItem from '../../components/ProductItem'

const FilterProducts = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        dispatch(actFilterProductAsync())
    }, [])


    const productPaging = useSelector((state) => state.Products.filterListProduct)
    if (!productPaging) {
        return
    }
    const product = productPaging.list
    const totalItem = productPaging.totalItem
    const currentPage = productPaging.currentPage
    const totalPage = productPaging.totalPage
    const hasMorePost = currentPage < totalPage
    const handleLoadingMore = () => {
        setIsLoading(true)
        dispatch(actFilterProductAsync({
            page: currentPage + 1
        }))
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="container">
            <div className="filter-product-page">
                <div className="fs-16 mb-2">
                    Có tất cả <span className="fw-500">{totalItem}</span> sản phẩm
                </div>
                <div className="filter-option mb-2">
                    Bộ lọc

                </div>
                <ul className="product__list">
                    {
                        product.map((item, index) => (
                            <ProductItem
                                product={item}
                                key={index}
                            />
                        ))
                    }
                </ul>
                <Row justify="center">
                    <Col>
                        {
                            hasMorePost && <Button
                                loading={isLoading}
                                type="primary"
                                danger
                                className="mt-2"
                                style={{ textAlign: 'center', display: 'block' }}
                                onClick={handleLoadingMore}
                                size="large"
                            >
                                Xem thêm {totalItem - product.length} sản phẩm
                            </Button>
                        }
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default FilterProducts

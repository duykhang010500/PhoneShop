import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../ProductItem'
import { Pagination, Spin } from 'antd'
import { useDispatch } from 'react-redux'
import Underline from '../common/Underline'
import { actFilterProductAsync, actGetListNewProductPagingAsync } from '../../store/products/actions'

export default function NewListProduct({ title }) {
    const selector = useSelector(state => state)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const listProduct = selector.Products.listNewProduct

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetListNewProductPagingAsync({ page }))
            .finally(() => setIsLoading(false))
    }, [dispatch, page])

    if (!listProduct) {
        return null
    }
    const list = listProduct.list
    const currPage = listProduct.currentPage
    const totalItem = listProduct.totalItem


    return (
        <div className="container">
            <div className="product">
                <div
                    style={{ fontSize: '2rem', fontWeight: 600, padding: '2rem' }}
                    className="title"
                >
                    {title}
                    <Underline />
                </div>
                <Spin spinning={isLoading}>
                    <ul className="product__list">
                        {
                            list.map((product, index) => <ProductItem key={index} product={product} />)
                        }
                    </ul>
                </Spin>
                <Pagination
                    style={{ textAlign: 'center', paddingBottom: 10 }}
                    current={page}
                    total={totalItem}
                    onChange={(page) => setPage(page)}

                />
            </div>
        </div>

    )
}
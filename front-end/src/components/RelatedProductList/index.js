import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { actGetRelatedListProductAsync } from '../../store/products/actions'
import ProductItem from '../ProductItem'
import Underline from '../common/Underline'

const RelatedProductList = ({ productSlug }) => {

    const dispatch = useDispatch()
    const { slug } = useParams
    console.log(slug)

    useEffect(() => {
        dispatch(actGetRelatedListProductAsync(productSlug))
    }, [productSlug, dispatch])

    const relatedProductList = useSelector((state) => state.Products.relatedListProduct)

    // if (!relatedProductList) {
    //     return null
    // }

    return (
        <div className="related-product-list">
            <h2>Sản phẩm tương tự</h2>
            <Underline />
            <ul className="product__list">
                {
                    relatedProductList.map((item, index) => (
                        <ProductItem
                            key={index}
                            product={item}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default RelatedProductList

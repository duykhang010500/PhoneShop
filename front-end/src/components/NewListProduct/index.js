import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../ProductItem'
import { Typography } from 'antd'

import Underline from '../common/Underline'

export default function NewListProduct({ title }) {
    const selector = useSelector(state => state)

    const listNew = selector.Products.list
    if (!listNew) {
        return null
    }

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
                <ul className="product__list">
                    {
                        listNew.map((product, index) => <ProductItem key={index} product={product} />)
                    }
                </ul>
            </div>
        </div>

    )
}
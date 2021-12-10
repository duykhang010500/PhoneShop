import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../ProductItem'
import Countdown from './Countdown'

export default function BestDiscount({ product }) {

    const selector = useSelector(state => state)
    const listDiscount = selector.Products.listBestDiscount.data
    if (!listDiscount) {
        return null
    }

    return (
        <div className="container">
            <div className="best__discount">
                <div className="product">
                    <div className="best__discount-heading">
                        <div className="best__discount-title">
                            giảm giá
                            <img
                                className="flash"
                                style={{ width: 30, height: 30, display: 'inline-block' }}
                                src="https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg" alt=""
                            />
                            cuối năm
                        </div>
                        <Countdown />
                    </div>
                    <ul className="product__list">
                        {
                            listDiscount.slice(0, 5).map((product, index) =>
                                <ProductItem
                                    key={index}
                                    product={product}
                                />)
                        }
                    </ul>
                </div>
            </div>
        </div>

    )
}
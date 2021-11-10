import React from 'react'
import ProductItem from '../ProductItem'

// import Products from '../../utils/mockData'
const ProductByCategoy = () => {
    return (
        <div className="product">
            <ul className="product__list product__list-category">
                {
                    Products.map((product, index) =>
                        <ProductItem
                            isShowCategory={true}
                            key={index}
                            product={product}
                        />)
                }
            </ul>
        </div>
    )
}

export default ProductByCategoy

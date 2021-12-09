import ProductItem from '../ProductItem'
import { Typography } from 'antd'

import Underline from '../common/Underline'

export default function NewListProduct({ title, product }) {

    // console.log(product)
    return (
        <div className="container">
            <div className="product">
                <Typography.Title
                    level={4}
                    className="title"
                >
                    {title}
                    <Underline />
                </Typography.Title>
                <ul className="product__list">
                    {
                        product.map((product, index) => <ProductItem key={index} product={product} />)
                    }
                </ul>
            </div>
        </div>

    )
}
import ProductItem from '../ProductItem'
import { Typography } from 'antd'
import Products from '../../utils/mockData'
import Underline from '../common/Underline'

export default function BestSeller({ title, product }) {

    console.log(product)

    return (
        <div className="container">
            <div className="product">
                <Typography.Title
                    level={4}
                    className="title"
                >
                    {title}
                </Typography.Title>
                <Underline />
                <ul className="product__list">
                    {
                        product.map((product, index) => <ProductItem key={index} product={product} />)
                    }
                </ul>
            </div>
        </div>

    )
}
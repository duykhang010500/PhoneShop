import ProductItem from '../ProductItem'
import { Typography } from 'antd'
import Products from '../../utils/mockData'

export default function BestSeller() {
    // console.log(Product)
    return (
        <div className="container">
            <Typography.Title level={4} className="title">
                Bán chạy nhất
            </Typography.Title>
            <div className="product">
                <ul className="product__list">
                    {
                        Products.map((product, index) => <ProductItem key={index} product={product} />)
                    }
                </ul>
            </div>
        </div>

    )
}
import ProductItem from '../ProductItem'
import { Typography } from 'antd'
export default function BestSeller() {
    return (
            <div className="container">
                <Typography.Title level={4} >
                    Bán chạy nhất
                </Typography.Title>
                <div className="product">
                    <ul className="product__list">
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                        <ProductItem />
                    </ul>
                </div>
            </div>

    )
}
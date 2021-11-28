import ProductItem from '../ProductItem'
import { Typography } from 'antd'

import Underline from '../common/Underline'

export default function BestDiscount({ title, product }) {

    return (
        <div className="container">
            <div className="product">
                <div className="best__discount">
                    <div className="best__discount-heading">
                        <div className="best__discount-title">
                            giá sốc
                            <img className="flash" style={{ width: 30, height: 30, display: 'inline-block' }} src="https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg" alt="" />
                            hôm nay
                        </div>
                        <div className="best__discount-navigation">
                            1hour
                        </div>
                    </div>
                    <ul className="product__list">
                        {
                            product.slice(0, 5).map((product, index) => <ProductItem key={index} product={product} />)
                        }
                    </ul>
                </div>
            </div>
        </div>

    )
}
import { Rate } from 'antd';
import { Link } from 'react-router-dom'
import { formatVND } from '../../utils/formatVND'

import cls from 'classnames'
import { Card } from 'antd'

export default function ProductItem({ product, isShowCategory }) {

    // const { avatar, name, price, oldPrice, rating, ratingCount } = product
    // console.log(product)

    const formatNewPrice = formatVND(product.newPrice)
    const formatOldPrice = formatVND(product.price)

    const finalClass = cls('product__item', {
        'product__item-category': isShowCategory
    })

    return (
        <li className={finalClass}>

            <Card
                hoverable
            >
                <Link to={`product/${product.id}`}
                >
                    <img src={product.avatar} alt="" className="product__item--thumb" />
                </Link>
                <div className="product__item-info">
                    <div className="product__item--name">
                        {product.name}
                    </div>
                    <div className="product__item--price">
                        <span className="product__item--price-new">{formatNewPrice}</span>
                        <span className="product__item--price-old">
                            <del>{formatOldPrice}</del>
                        </span>
                    </div>
                    <div className="product__item--rating">
                        <Rate
                            disabled
                            value={product.rating}
                            style={{ fontSize: 15 }}

                        />
                        <span className="product__item--rating-num">
                            ({product.ratingCount})
                        </span>
                    </div>
                </div>
            </Card>
        </li>
    )
}
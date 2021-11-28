import { Link } from 'react-router-dom'
import cls from 'classnames'
import {
    convertNewPrice,
    formatVND
} from '../../helpers/priceFormat'

export default function ProductItem({ product, isShowCategory }) {

    const finalClass = cls('product__item', {
        'product__item-category': isShowCategory
    })

    return (
        <li className={finalClass}>
            <Link to={`/product/${product.slug}`}>

                <img src={product.image} alt="" className="product__item--thumb" />
                <div className="product__item-info">
                    <div className="product__item--name">
                        {product.name}
                    </div>
                    <div className="product__item--price">
                        <span className="product__item--price-new">
                            {
                                formatVND(convertNewPrice(product.price, product.discount))
                            }
                        </span>
                        <span className="product__item-discount">
                            -{product.discount}%
                        </span>
                        {/* <span className="product__item--price-old">
                            <del>
                                {
                                    formatVND(product.price)
                                }
                            </del>
                        </span> */}
                    </div>
                </div>
            </Link>
        </li>
    )
}
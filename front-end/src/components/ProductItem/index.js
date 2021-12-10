import { Link } from 'react-router-dom'
import cls from 'classnames'
import {
    convertNewPrice,
    formatVND
} from '../../helpers/priceFormat'
import { Button } from 'antd'
import { IoIosGitCompare } from "react-icons/io";

export default function ProductItem({ product, isShowCategory, isShowCompareButton }) {

    const finalClass = cls('product__item', {
        'product__item-category': isShowCategory
    })

    return (
        <li className={finalClass}>
            <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt="" className="product__item--thumb" />
            </Link>

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


                    {
                        product.discount !== 0 && <span className="product__item-discount">
                            -{product.discount}%
                        </span>
                    }
                    {/* <span className="product__item--price-old">
                        <del>
                            {
                                formatVND(product.price)
                            }
                        </del>
                    </span> */}
                </div>
                {
                    isShowCompareButton && <Button
                        className="mt-1 mt-auo d-flex-center"
                        icon={<IoIosGitCompare />}
                        danger
                        onClick={() => alert('Click compare')}
                    >
                        &nbsp; So sánh ngay
                    </Button>
                }
            </div>
        </li>
    )
}
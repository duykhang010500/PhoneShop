import { Rate } from 'antd';
import { Link } from 'react-router-dom'
import { formatVND } from '../../utils/formatVND'

export default function ProductItem() {
    
    const formatNewPrice = formatVND(30000000);
    const formatOldPrice = formatVND(10000000)
    return (
        <li className="product__item">
            <Link to='/iphone-15gb'>
                <img src="https://hoanghamobile.com/i/productlist/dsp/Uploads/2021/03/19/iphoone-12.png" alt="" className="product__item--thumb" />
            </Link>
            <div className="product__item--name">
                Xiaomi Redmi Note 10 Pro 8GB
            </div>
            <div className="product__item--price">
                <span className="product__item--price-new">{formatNewPrice}</span>
                <span className="product__item--price-old">
                    <del>{formatOldPrice}</del>
                </span>
            </div>
            <div className="product__item--rating">
                <Rate disabled value={3.5} />
                <span className="product__item--rating-num">
                    10 đánh giá
                </span>
            </div>
        </li>
    )
}
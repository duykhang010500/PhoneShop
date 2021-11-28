import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actGetMyWishListAsync } from '../../store/wishList/action'
import { convertNewPrice, formatVND } from '../../helpers/priceFormat'
import { Link } from 'react-router-dom'
const DashboardUserWishList = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetMyWishListAsync()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    const myWishList = useSelector(state => state.WishList)

    if (isLoading) {
        return <div>
            Đang tải danh sách yêu thích
        </div>
    } else {
        return (
            <div className="wishlist-page">
                <ul className="wishlist">
                    {
                        myWishList.map((item, index) => {
                            return (
                                <li className="wishlist__item" key={index}>
                                    <Link to={`/product/${item.product.slug}`}>
                                        <div className="wishlist__item-thumb">
                                            <img src={item.product.image} alt="" />
                                        </div>
                                    </Link>
                                    <div className="wishlist__item-info">
                                        <Link to={`/product/${item.product.slug}`}>
                                            <div className="wishlist__item-name">
                                                {item.product.name}
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="wishlist__item-price">
                                        <div className="wishlist__item-price--new">
                                            {formatVND(convertNewPrice(item.product.price, item.product.discount))}
                                        </div>
                                        <div className="wishlist__item-price--old">
                                            {formatVND(item.product.price)}
                                            <span>-{item.product.discount}%</span>
                                        </div>
                                    </div>
                                    <button className="btn-close">×</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

}

export default DashboardUserWishList

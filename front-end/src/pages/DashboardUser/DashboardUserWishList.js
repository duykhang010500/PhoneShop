import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actGetMyWishListAsync } from '../../store/wishList/action'

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
            Đang tải
        </div>
    } else {
        return (
            <div className="wishlist-page">
                {
                    myWishList.map((item, index) => {
                        return (
                            <Row
                                justify="space-between"
                                style={{ backgroundColor: '#fff', marginBottom: 2, padding: 20 }}
                            >
                                <Col span={6}>
                                    <img src={item.product.image}
                                        style={{ width: 130, height: 130 }}
                                    />
                                </Col>
                                <Col span={10}>
                                    {
                                        item.product.name
                                    }
                                </Col>
                                <Col span={8}>
                                    {
                                        item.product.price
                                    }
                                </Col>
                            </Row>
                        )
                    })
                }
            </div>
        )
    }

}

export default DashboardUserWishList

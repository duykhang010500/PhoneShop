import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Divider, Space, Typography } from 'antd'
import { convertNewPrice, formatVND } from '../helpers/priceFormat'
import { convertProductInfo } from '../helpers/convertInfo'
import { actRemoveCompare } from '../store/compare/action'
const CompareProduct = () => {
    const compareList = useSelector(state => state.Compare.compareList)
    const dispatch = useDispatch()
    return (
        <div className='container mt-12 compare-page'>
            <Typography.Title level={4}>So sánh điện thoại</Typography.Title>
            <ul className="list-product-compare">
                {
                    compareList.map((item, index) => (
                        <li className="list-item">
                            <div className='list-item-thumb'>
                                <Link to={`/product/${item.slug}`}>
                                    <img
                                        src={item.image}
                                        alt=""
                                    />
                                </Link>
                                <Space direction='vertical'>
                                    <Typography.Text className='fs-16 fw-500'>
                                        {
                                            item.name
                                        }
                                    </Typography.Text>
                                    <Typography.Text type="danger" className='fs-16 fw-500'>
                                        {
                                            formatVND(convertNewPrice(item.price, item.discount))
                                        }
                                    </Typography.Text>
                                </Space>
                                <div className="remove-compare"
                                    onClick={() => dispatch(actRemoveCompare(item.id))}

                                >
                                    ×
                                </div>
                            </div>
                            <Divider></Divider>
                            {
                                index === 0 ?
                                    Object.keys(item.product_info).map((key, index) => {
                                        return (
                                            <div>
                                                <p style={{ fontSize: 16, color: "#666", marginBottom: 10, fontWeight: 'bold' }}>{convertProductInfo(key)}</p>
                                                <p style={{ fontSize: 13 }}>
                                                    {item.product_info[key]}
                                                </p>

                                            </div>
                                        )
                                    }) :
                                    Object.keys(item.product_info).map((key, index) => {
                                        return (
                                            <div>
                                                <p style={{ fontSize: 16, color: "#666", marginBottom: 10 }}>&nbsp;</p>
                                                <p style={{ fontSize: 13 }}>
                                                    {item.product_info[key]}
                                                </p>
                                            </div>
                                        )
                                    })
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default CompareProduct

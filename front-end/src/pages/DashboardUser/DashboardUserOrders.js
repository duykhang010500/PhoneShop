import React, { useEffect, useState } from 'react'
import {
    Table,
    Tag,
    Button,
    Tooltip,
    Modal,
    Row,
    Col,
    Image,
    Avatar
} from 'antd'

import {
    SyncOutlined,
    CheckCircleOutlined,
    EyeOutlined
} from '@ant-design/icons'
import { FaTruck } from "react-icons/fa"

import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import { useAuthenticated } from '../../hooks/useAuthenticate'
import { actGetDetailOrdersAsync, actGetMyOrdersAsync } from '../../store/orders/action'
import { formatVND } from '../../helpers/priceFormat'

const DashboardUserOrder = () => {

    useAuthenticated()
    const dispatch = useDispatch()

    const myOrders = useSelector(state => state.Orders.listOrders)
    const detailOrders = useSelector(state => state.Orders.detailOrder)
    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetMyOrdersAsync()).finally(() => {
            setIsLoading(false)
        })
    }, [])

    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [detailId, setDetailId] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)


    const handleShowDetailOrder = (orderCode) => {
        setShowModal(true)
        setDetailId(orderCode)
        setIsLoading(true)
        dispatch(actGetDetailOrdersAsync(orderCode)).then(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        const getTotalPrice = () => {
            const total = detailOrders.reduce((prev, item) => {
                return prev + (item.product_price * item.product_quantity)
            }, 0)
            setTotalPrice(total)
        }
        if (detailOrders) {
            getTotalPrice()
        }
    }, [detailOrders])


    const columns = [
        {
            title: 'Mã đơn hàng',
            key: 'order_code',
            dataIndex: 'order_code'
        },
        {
            title: 'Ngày mua',
            key: 'created_at',
            dataIndex: 'created_at',
            render: text => <span>{
                moment(text).format("LLLL")
            }</span>
        },
        {
            title: 'Tổng tiền',
            key: 'total',
            dataIndex: 'total',
            render: price => <span style={{ color: 'red', fontWeight: 500 }}>{formatVND(price)}</span>
        },
        {
            title: 'Trạng thái đơn hàng',
            key: 'status',
            dataIndex: 'status',
            render: tag => {
                if (tag == '1') {
                    return <Tag icon={<SyncOutlined spin />} color="processing">
                        Đang chờ xử lý
                    </Tag>
                }
                if (tag == '2') {
                    return <Tag icon={<FaTruck style={{ paddingTop: '4px', marginRight: '4px' }} />} color="warning">
                        Đang giao hàng
                    </Tag>
                }
                if (tag == '3') {
                    return <Tag icon={<CheckCircleOutlined />} color="success">
                        Đã hoàn thành
                    </Tag>
                }
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (order) => {
                return (
                    <Tooltip
                        title="Xem chi tiết"
                    >
                        <Button
                            icon={<EyeOutlined />}
                            type="primary"
                            onClick={() => handleShowDetailOrder(order.order_code)}
                        >
                        </Button>
                    </Tooltip>
                )
            }
        }
    ]


    return (
        <div>
            <Table
                columns={columns}
                dataSource={myOrders}
                loading={isLoading}
                rowKey={(record) => record.order_code}
            />

            <Modal
                title={`Chi tiết đơn hàng #${detailId}`}
                visible={showModal}
                onOk={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                style={{ top: 20 }}
            >
                {
                    !detailOrders ? (
                        <span>Đang tải thông tin</span>
                    ) : (
                        <div className="order__detail">
                            <div className="order__detail-customer">
                                <div className="order__detail-customer--title">
                                    Thông tin khách hàng
                                </div>
                                <div className="order__detail-customer--detail">
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Họ và tên: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.name}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Địa chỉ nhận hàng: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.address}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Số điện thoại: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.phone}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Ngày đặt hàng: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.created_at}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Ghi chú: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.note}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Thanh toán: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.method}
                                    </div>
                                </div>
                            </div>
                            <div className="order__detail-product">
                                <div className="order__detail-product--title">
                                    Thông tin sản phẩm
                                </div>
                                {
                                    detailOrders.map((item, index) => {
                                        return (
                                            <div key={index} className="order__detail-product--detail">
                                                <div className="order__detail-product--info">
                                                    <Avatar
                                                        shape="square"
                                                        src={item.product_image}
                                                        style={{ width: 75, height: 75 }}
                                                    />
                                                    <div className="order__detail-product--name">
                                                        {item.product_name} ({item.product_color})
                                                    </div>
                                                    <span className="order__detail-product--quantity">X {item.product_quantity}</span>
                                                    <div className="order__detail-product--price">
                                                        {formatVND(+item.product_price)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="order__detail-total">
                                <span>Thành tiền: </span>
                                <span className="total-price">
                                    {formatVND(totalPrice)}
                                </span>
                            </div>
                        </div>
                    )
                }


            </Modal>
        </div>
    )
}

export default DashboardUserOrder

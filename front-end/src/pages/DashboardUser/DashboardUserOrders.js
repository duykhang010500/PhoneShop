import React, { useEffect, useState } from 'react'

import {
    Table,
    Tag,
    Button,
    Tooltip
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
import { actGetMyOrdersAsync } from '../../store/orders/action'
import { formatVND } from '../../helpers/priceFormat'

const DashboardUserOrder = () => {

    useAuthenticated()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetMyOrdersAsync()).finally(() => {
            setIsLoading(false)
        })
    }, [])

    const myOrders = useSelector(state => state.Orders.listOrders)
    if (!myOrders) {
        return
    }

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
            render: (action) => {
                return (
                    <Tooltip title="Xem chi tiết">
                        <Button
                            icon={<EyeOutlined />}
                            type="primary"
                        >
                        </Button>
                    </Tooltip>
                )
            }
        }
    ]

    return (
        <Table
            columns={columns}
            dataSource={myOrders}
            loading={isLoading}
            rowKey={(record) => record.order_code}
        />
    )
}

export default DashboardUserOrder

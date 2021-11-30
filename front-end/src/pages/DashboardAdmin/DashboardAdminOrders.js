import React, { useEffect, useState } from 'react'
import {
    Row,
    Col,
    Breadcrumb,
    Table,
    Space,
    Button,
    Tooltip,
    Tag,
    Avatar,
    Modal
} from 'antd';

import { useSelector, useDispatch } from 'react-redux'

import {
    HomeOutlined,
    EyeOutlined,
    CheckOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    EditOutlined,
} from '@ant-design/icons';

import { FaTruck } from "react-icons/fa"

import { actGetDetailOrderUserAsync, actGetListOrdersUserAsync } from '../../store/orders/action';
import { convertNewPrice, formatVND } from '../../helpers/priceFormat'

const DashboardAdminOrders = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetListOrdersUserAsync()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    const [isLoading, setIsLoading] = useState(false)
    const [ordersSelected, setOrderSelected] = useState('')

    const listOrdersUser = useSelector((state) => state.Orders.listOrdersUser)

    const handleGetDetailOrders = (id) => {
        console.log(id)
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order_code',
            key: 'order_code',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
        },
        ,
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
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
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Cập nhật">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                        // loading
                        >
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            style={{
                                backgroundColor: "#52c41a",
                                border: "none"
                            }}
                            onClick={() => handleGetDetailOrders(record.order_code)}
                        >
                        </Button>
                    </Tooltip>
                </Space>
            )
        }
    ];

    return (
        <Row
            gutter={[20, 20]}
        >
            <Col span={24}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={24}>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={listOrdersUser}
                />
            </Col>

        </Row>
    )
}

export default DashboardAdminOrders

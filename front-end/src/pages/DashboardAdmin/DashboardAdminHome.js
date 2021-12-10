
import React, { useEffect } from 'react'
import {
    Row,
    Col,
    Card,
    Statistic,
    Typography,
    Breadcrumb,
    Table
} from 'antd'

import { useDispatch, useSelector } from 'react-redux'

import {
    HomeOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    TabletOutlined,
    CloseOutlined,
    ReconciliationOutlined
} from '@ant-design/icons'
import { MdAttachMoney } from "react-icons/md";
import { Tag } from 'antd'
import { FaTruck } from "react-icons/fa"
import { actGetDashboardAsync } from '../../store/statistics/action'
import { formatVND } from '../../helpers/priceFormat'

const DashboardHome = () => {

    const selector = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actGetDashboardAsync())
    }, [])
    const statistics = selector.Statistics
    if (!statistics) {
        return null
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order_code',
            key: 'order_code'
        },
        {
            title: 'Thời gian đặt',
            dataIndex: 'created_at',
            key: 'created_at'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: tag => {
                if (tag == '0') {
                    return <Tag color="error" icon={<CloseOutlined />}>
                        Đã huỷ
                    </Tag>
                }
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
            title: 'Tổng tiền',
            key: 'total',
            dataIndex: 'total',
            render: (total) => (
                <Typography.Text
                    type="danger"
                    strong
                >
                    {formatVND(total)}
                </Typography.Text>
            )
        }
    ]

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Breadcrumb>
                    <Breadcrumb.Item
                        href="/admin"
                    >
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Tổng quan
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col
                sx={24}
                md={6}
            >
                <Card hoverable className='box-sd1'>
                    <Statistic
                        title="Giao dịch trong ngày"
                        value={statistics.todaySales}
                        valueStyle={{ color: '#52c41a' }}
                        prefix={<ReconciliationOutlined />}
                    />
                </Card>
            </Col>
            <Col
                sx={24}
                md={6}
            >
                <Card hoverable className='box-sd1'>
                    <Statistic
                        title="Thu nhập trong ngày"
                        value={statistics.todayRevenue}
                        valueStyle={{ color: 'red' }}
                        prefix={<MdAttachMoney />}
                    />
                </Card>
            </Col>
            <Col
                sx={24}
                md={6}
            >
                <Card hoverable className='box-sd1'>
                    <Statistic
                        title="Tổng thu nhập"
                        value={formatVND(statistics.totalRevenue)}
                        valueStyle={{ color: 'red' }}
                        prefix={<MdAttachMoney />}

                    />
                </Card>
            </Col>
            <Col
                sx={24}
                md={6}
            >
                <Card hoverable className='box-sd1'>
                    <Statistic
                        title="Tổng giao dịch thành công"
                        value={
                            statistics.totalSales
                        }
                        valueStyle={{ color: '#52c41a' }}
                        prefix={< SyncOutlined />}
                    />
                </Card>
            </Col>
            <Col span={24}>
                <Typography.Title level={5}>
                    Đơn hàng mới nhất
                </Typography.Title>
                <Table
                    columns={columns}
                    dataSource={statistics.orders}
                />
            </Col>


        </Row>
    )
}

export default DashboardHome

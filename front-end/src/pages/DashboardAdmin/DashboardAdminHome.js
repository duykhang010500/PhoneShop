
import React, { useEffect } from 'react'
import {
    Row,
    Col,
    Card,
    Statistic,
    Typography,
    Breadcrumb,
} from 'antd'

import { useDispatch, useSelector } from 'react-redux'

import {
    HomeOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    CloseOutlined,
    ReconciliationOutlined
} from '@ant-design/icons'
import { Line } from '@ant-design/charts';
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

    const data = []

    statistics.sales.forEach((item, index) => {
        data.push({
            month: `Tháng ${index + 1}`,
            value: item
        })
        return data
    })

    const config = {
        data,
        xField: 'month',
        yField: 'value',
        label: {},
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: {
            showMarkers: false,
        },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [
            {
                type: 'marker-active',
            },
        ],
    };

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
                xs={24}
                sm={12}
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
                xs={24}
                sm={12}

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
                xs={24}
                sm={12}
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
                xs={24}
                sm={12}
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
                <Line {...config} />
            </Col>
        </Row>
    )
}

export default DashboardHome

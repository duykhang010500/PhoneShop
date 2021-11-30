
import React from 'react'
import {
    Row,
    Col,
    Card,
    Statistic,
    Typography,
    Breadcrumb
} from 'antd'

import { Line, Pie } from '@ant-design/charts'

import {
    ReconciliationOutlined,
    TeamOutlined,
    TabletOutlined,
    HomeOutlined
} from '@ant-design/icons'

const DashboardHome = () => {

    const data = [
        { month: '9', value: 40 },
        { month: '10', value: 90 },
        { month: '11', value: 65 },
        { month: '12', value: 55 },
    ];

    const config = {
        data,
        height: 400,
        xField: 'month',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    var dataPie = [


        {
            type: 'Iphone',
            value: 50,
        },
        {
            type: 'Samsung',
            value: 10,
        },
        {
            type: 'Vivo',
            value: 20,
        },
        {
            type: 'Opppo',
            value: 20,
        },
    ];

    var configPie = {
        appendPadding: 10,
        data: dataPie,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(_ref) {
                var percent = _ref.percent;
                return ''.concat((percent * 100).toFixed(0), '%');
            },
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [{ type: 'element-active' }],
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
                sx={24}
                md={6}
            >
                <Card
                    hoverable
                    bodyStyle={{
                        backgroundColor: '#1890ff'
                    }}
                >
                    <Statistic
                        title="Đơn hàng"
                        value={10}
                        valueStyle={{
                            color: 'white',
                            fontSize: '3rem'
                        }}
                        prefix={<ReconciliationOutlined />}
                    // suffix="%"
                    />
                </Card>
            </Col>
            <Col
                sx={24}
                md={6}
            >
                <Card
                    hoverable
                    bodyStyle={{
                        backgroundColor: '#9254de'
                    }}
                >
                    <Statistic
                        title="Thương hiệu"
                        value={6}
                        valueStyle={{
                            color: 'white',
                            fontSize: '3rem'
                        }}
                        prefix={<ReconciliationOutlined />}
                    // suffix="%"
                    />
                </Card>
            </Col>
            <Col
                sx={24}
                md={6}
            >
                <Card
                    hoverable
                    bodyStyle={{
                        backgroundColor: '#f759ab'
                    }}
                >
                    <Statistic
                        title="Sản phẩm"
                        value={20}
                        valueStyle={{
                            color: 'white',
                            fontSize: '3rem'
                        }}
                        prefix={<TabletOutlined />}
                    // suffix="%"
                    />
                </Card>
            </Col>
            <Col
                sx={24}
                md={6}
            >
                <Card
                    hoverable
                    bodyStyle={{
                        backgroundColor: '#52c41a'
                    }}
                >
                    <Statistic
                        title="Khách hàng"
                        value={7}
                        valueStyle={{
                            color: 'white',
                            fontSize: '3rem'
                        }}
                        prefix={<TeamOutlined />}
                    // suffix="%"
                    />
                </Card>
            </Col>
            <Col span={24}>
                <Typography.Title
                    level={4}
                >
                    Biểu đồ
                </Typography.Title>
            </Col>
            <Col
                span={12}
            >
                <Line {...config} />
            </Col>
            <Col span={12}>
                <Pie {...configPie} />
            </Col>
        </Row>
    )
}

export default DashboardHome

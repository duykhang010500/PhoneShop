
import React from 'react'
import {
    Row,
    Col,
    Card,
    Statistic,
    Typography,
    Breadcrumb
} from 'antd'



import {
    ReconciliationOutlined,
    TeamOutlined,
    TabletOutlined,
    HomeOutlined
} from '@ant-design/icons'

const DashboardHome = () => {



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


        </Row>
    )
}

export default DashboardHome


import React from 'react'
import {
    Row,
    Col,
    Card,
    Statistic,
} from 'antd'

const DashboardHome = () => {
    return (
        <Row gutter={[16, 16]}>
            <Col
                sx={24}
                md={6}
            >
                <Card
                    hoverable
                >
                    <Statistic
                        title="Số đơn hàng"
                        value={1}
                        valueStyle={{ color: '#3f8600' }}
                    // prefix={<ArrowUpOutlined />}
                    // suffix="%"
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default DashboardHome

import React from 'react'
import {
    Row,
    Col,
    Breadcrumb,
    Table,
    Space,
    Button,
    Tooltip

} from 'antd';
import {
    HomeOutlined,
    EyeOutlined,
    FormOutlined
} from '@ant-design/icons';

const DashboardAdminOrders = () => {
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Người đặt',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Địa chỉ'
        },
        {
            title: 'Tổng tiền'
        },
        {
            title: 'Trạng thái'
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="primary"

                            icon={<EyeOutlined />}
                            style={{
                                backgroundColor: "#52c41a",
                                border: "none"
                            }}
                        >

                        </Button>
                    </Tooltip>
                    <Tooltip title="Cập nhật">
                        <Button
                            type="primary"
                            icon={<FormOutlined />}
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
                    columns={columns}
                />
            </Col>
        </Row>
    )
}

export default DashboardAdminOrders

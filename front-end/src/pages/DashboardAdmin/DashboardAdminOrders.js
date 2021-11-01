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
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    return (
        <Row>
            <Col span={24}>
                <Breadcrumb
                    style={{
                        marginBottom: '2rem'
                    }}
                >
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={24}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                />
            </Col>
        </Row>
    )
}

export default DashboardAdminOrders

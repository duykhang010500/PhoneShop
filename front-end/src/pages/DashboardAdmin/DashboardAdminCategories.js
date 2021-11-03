import React, { useState } from 'react'

import {
    Row,
    Col,
    Breadcrumb,
    Table,
    Space,
    Button,
    Drawer,
    Form,
    Input,

} from 'antd'

import {
    HomeOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    FormOutlined,
    SaveOutlined
} from '@ant-design/icons'


const DashboardAdminCategories = () => {

    const [form] = Form.useForm()
    const [showFormAdd, setShowFormAdd] = useState(false)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Tên hãng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Đường dẫn',
            dataIndex: 'slug',
            key: 'slug'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
        }
        ,
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                    >

                    </Button>
                    <Button
                        type="primary"
                        icon={<FormOutlined />}
                        type="primary"
                    >

                    </Button>
                </Space>
            )
        }
    ]

    const handleSubmit = (values) => {
        console.log(values)
    }

    return (
        <Row
            gutter={[16, 16]}
        >
            <Col span={24}>
                <Breadcrumb
                    style={{
                        marginBottom: '2rem'
                    }}
                >
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Sản phẩm
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Quản lý hãng
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={24}>
                <Space>
                    <Button
                        size="large"
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => setShowFormAdd(!showFormAdd)}
                    >
                        Thêm mới
                    </Button>
                </Space>
            </Col>
            <Col span={24}>
                <Table
                    columns={columns}

                />
            </Col>
            <Drawer
                title="Tạo hãng mới"
                placement="right"
                closable={true}
                onClose={() => setShowFormAdd(false)}
                visible={showFormAdd}

            >
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Tên hãng"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Đường dẫn"
                        name="slug"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                        >
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </Row>
    )
}

export default DashboardAdminCategories

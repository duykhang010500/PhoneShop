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
    message,
    Tooltip,
    Popconfirm
} from 'antd'
import {
    HomeOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    FormOutlined,
    SaveOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import {
    actCreateBrandAsync,
    actDeleteBrandAsync,
    actGetListBrandAsync,
    actUpdateBrandAsync
} from '../../store/brands/actions'
import { useAdmin } from '../../hooks/useAuthenticate'
const DashboardAdminCategories = () => {
    useAdmin()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [idSelected, setIdSelected] = useState("")
    const [form] = Form.useForm()
    const [showFormAdd, setShowFormAdd] = useState(false)
    const [showFormUpdate, setShowFormUpdate] = useState(false)

    //Get list brand
    const brands = useSelector(state => state.Brands.list)

    //Create Brand
    const handleSubmit = (values) => {
        setIsLoading(true)
        dispatch(actCreateBrandAsync(values)).then((res) => {
            if (res.ok) {
                message.success(res.message)
                dispatch(actGetListBrandAsync())
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            form.resetFields()
            setShowFormAdd(false)
            setIsLoading(false)
        })
    }

    //Delete brand
    const handleDeleteBrand = (id) => {
        setIsLoading(true)
        dispatch(actDeleteBrandAsync(id)).then((res) => {
            if (res.ok) {
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            dispatch(actGetListBrandAsync())
            setIsLoading(false)
        })
    }

    //Update Brand
    const handleUpdate = (values) => {
        console.log(idSelected)
        // console.log(values)
        setIsLoading(true)
        dispatch(actUpdateBrandAsync(idSelected, values)).then((res) => {
            if (res.ok) {
                message.success(res.message)
            } else {
                message.error(res.message)
            }
        }).finally(() => {
            setIsLoading(false)
            setShowFormUpdate(false)
            dispatch(actGetListBrandAsync())
        })
    }

    //Columns in table
    const columnsBrandTable = [
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
            title: 'Mô tả',
            dataIndex: 'desc',
            key: 'desc'
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Tooltip title="Cập nhật">
                        <Button
                            type="primary"
                            className="btn-primary"
                            icon={<FormOutlined />}
                            onClick={() => {
                                setShowFormUpdate(true)
                                setIdSelected(record.slug)
                                form.setFieldsValue({
                                    name: record.name,
                                    slug: record.slug,
                                    desc: record.desc
                                })
                            }}
                        >
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Popconfirm
                            placement="topRight"
                            title={`Xóa hãng ${record.name}`}
                            onConfirm={() => handleDeleteBrand(record.slug)}
                        >
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                            >
                            </Button>
                        </Popconfirm>
                    </Tooltip>

                </Space>
            )
        }
    ]

    //render
    return (
        <Row gutter={[16, 16]}>
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
                        className="btn-primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => setShowFormAdd(!showFormAdd)}
                    >
                        Thêm mới
                    </Button>
                </Space>
            </Col>

            <Col span={24}>
                <Table
                    columns={columnsBrandTable}
                    dataSource={brands}
                    loading={isLoading}
                    rowKey={(record) => record.id}
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
                    form={form}
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
                    <Form.Item
                        label="Mô tả"
                        name="desc"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={isLoading}
                        >
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer
                title="Cập nhật thông tin"
                placement="right"
                closable={true}
                onClose={() => setShowFormUpdate(false)}
                visible={showFormUpdate}
            >
                <Form
                    layout="vertical"
                    onFinish={handleUpdate}
                    form={form}
                >
                    <Form.Item
                        label="Tên hãng"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Đường dẫn"
                        name="slug"
                        rules={[{ required: true }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="desc"
                        rules={[{ required: true }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={isLoading}
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </Row>
    )
}

export default DashboardAdminCategories

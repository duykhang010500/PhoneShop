import React, { useState, useEffect } from 'react'
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
    Popconfirm,
    Switch
} from 'antd'
import {
    HomeOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    FormOutlined,
    SaveOutlined,
    SearchOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
    actCreateBrandAsync,
    actDeleteBrandAsync,
    actGetListBrandAdminAsync,
    actGetListBrandAsync,
    actUpdateBrandAsync
} from '../../store/brands/actions'
import slugify from 'slugify'

const DashboardAdminCategories = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [idSelected, setIdSelected] = useState("")
    const [form] = Form.useForm()
    const [showFormAdd, setShowFormAdd] = useState(false)
    const [showFormUpdate, setShowFormUpdate] = useState(false)
    const [listBrand, setListBrand] = useState([])
    //Get list brand

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetListBrandAdminAsync())
            .then((res) => setListBrand(res))
            .finally(() => setIsLoading(false))
    }, [dispatch])

    //Create Brand
    const handleSubmit = (values) => {
        setIsLoading(true)
        dispatch(actCreateBrandAsync(values)).then((res) => {
            if (res.ok) {
                message.success(res.message)
                dispatch(actGetListBrandAdminAsync())
                    .then((res) => setListBrand(res))
                    .finally(() => setIsLoading(false))
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
            dispatch(actGetListBrandAdminAsync())
                .then((res) => setListBrand(res))
                .finally(() => setIsLoading(false))
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
            dispatch(actGetListBrandAdminAsync())
        })
    }

    const handleChangeStatus = (status, record) => {
        console.log('status', status, record)
        setIsLoading(true)
        if (status === 1) {
            dispatch(actUpdateBrandAsync(record.slug, { ...record, status: 0 }))
                .finally(() => setIsLoading(false))
        } else {
            dispatch(actUpdateBrandAsync(record.slug, { ...record, status: 1 }))
                .finally(() => setIsLoading(false))
        }
    }

    //Columns in table
    const columnsBrandTable = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Tên hãng',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Space>
                            <Input
                                placeholder='Nhập tên hãng'
                                value={selectedKeys}
                                onChange={(e) => {
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                    confirm({ closeDropdown: false })
                                }}
                            />
                            <Space>
                                <Button
                                    onClick={() => confirm()}
                                    type='primary'
                                    size='small'
                                >
                                    Ok
                                </Button>
                                <Button
                                    onClick={() => clearFilters()}
                                    type='primary'
                                    danger
                                    size='small'
                                >
                                    Reset
                                </Button>
                            </Space>
                        </Space>
                    </div>
                )
            },
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase())
        },
        {
            title: 'Đường dẫn',
            dataIndex: 'slug',
            key: 'slug',
            render: (slug) => (
                <span>/{slug}</span>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {
                return <Switch
                    onChange={() => handleChangeStatus(status, record)}
                    defaultChecked={status}
                />
            },
            filters: [
                { text: 'Đang kích hoạt', value: 1 },
                { text: 'Đang ẩn', value: 0 },
            ],
            onFilter: (value, record) => record.status === value
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
                <Space size='middle'>
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
                    dataSource={listBrand}
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

import React, { useState, useEffect } from 'react'
import { Breadcrumb, Row, Col, Table, Button, Modal, Form, Input, InputNumber, Space, Tooltip, Popconfirm, message } from 'antd'
import { HomeOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { actCreateCouponAsync, actDeleteCouponAsync, actGetListCouponAsync, actUpdateCoupon, actUpdateCouponAsync } from '../../store/coupons/action'
import { formatVND } from '../../helpers/priceFormat'

const DashboardAdminCoupon = () => {

    const dispatch = useDispatch()
    const [formAdd] = Form.useForm()
    const [formUpdate] = Form.useForm()
    const selector = useSelector((state) => state)
    const [isLoading, setIsLoading] = useState(true)
    const [isShowModalAdd, setIsShowModalAdd] = useState(false)
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false)
    const [couponSelected, setCouponSelected] = useState(null)

    useEffect(() => {
        dispatch(actGetListCouponAsync())
            .finally(() => setIsLoading(false))
    }, [])

    const listCoupon = selector.Coupons.list
    if (!listCoupon) {
        return null
    }

    const columns = [
        {
            title: 'Tên khuyến mại',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: ({ setSelectedKeys, SelectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Space direction='vertical'>
                            <Input
                                placeholder='Nhập tên khuyến mại'
                                value={SelectedKeys}
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
                                    size='small'
                                    danger
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
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Space direction='vertical'>
                            <Input
                                placeholder='Nhập code'
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
                                    size='small'
                                    danger
                                >
                                    Reset
                                </Button>
                            </Space>
                        </Space>
                    </div>
                )
            },
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) => record.code.toLowerCase().includes(value.toLowerCase())
        },
        {
            title: 'Giá trị giảm (VNĐ)',
            dataIndex: 'number',
            key: 'number',
            render: (number) => {
                return <span>
                    {formatVND(+number)}
                </span>
            },
            sorter: (a, b) => +a.number - +b.number
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (item, record) => (
                <Space size='middle'>
                    <Tooltip title='Chỉnh sửa'>
                        <Button
                            icon={<EditOutlined />}
                            type='primary'
                            onClick={() => {
                                setCouponSelected(record)
                                setIsShowModalUpdate(true)
                                formUpdate.setFieldsValue({
                                    name: record.name,
                                    code: record.code,
                                    number: record.number,
                                    quantity: record.quantity
                                })
                            }}
                        >
                        </Button>
                    </Tooltip>
                    <Tooltip title='Xoá'>
                        <Button
                            icon={<DeleteOutlined />}
                            type='primary'
                            danger
                            onClick={() => handleDeleteCoupon(record.code)}
                        >
                        </Button>
                    </Tooltip>
                </Space>
            )
        }
    ]

    const handleDeleteCoupon = (code) => {
        setIsLoading(true)
        dispatch(actDeleteCouponAsync(code))
            .then(() => {
                message.success('Xoá thành công!')
            })
            .finally(() => {
                dispatch(actGetListCouponAsync())
                setIsLoading(false)
            })
    }

    const handleCreateCoupon = () => {
        formAdd.validateFields()
            .then((formData) => {
                setIsLoading(true)
                dispatch(actCreateCouponAsync(formData))
                    .then(() => {
                        formAdd.resetFields()
                        message.success('Tạo khuyến mại thành công!')
                    })
                    .finally(() => {
                        setIsShowModalAdd(false)
                        setIsLoading(false)
                        dispatch(actGetListCouponAsync())
                    })
            })
    }

    const handleUpdateCoupon = (code) => {
        formUpdate.validateFields()
            .then((formData) => {
                setIsLoading(true)
                dispatch(actUpdateCouponAsync(code, formData))
                    .then(() => {
                        formUpdate.resetFields()
                        message.success('Cập nhật thành công!')
                    })
                    .finally(() => {
                        setIsShowModalUpdate(false)
                        setIsLoading(false)
                        dispatch(actGetListCouponAsync())
                    })
            })
    }

    return (
        <Row gutter={[20, 20]}>
            <Modal
                title={`Cập nhật khuyến mại "${couponSelected && couponSelected.name}"`}
                visible={isShowModalUpdate}
                onCancel={() => setIsShowModalUpdate(false)}
                onOk={() => handleUpdateCoupon(couponSelected.code)}
                confirmLoading={isLoading}
            >
                <Form
                    layout='vertical'
                    form={formUpdate}
                >
                    <Form.Item
                        label='Tên khuyến mại'
                        name='name'
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên khuyến mại!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Mã khuyến mại'
                        name='code'
                        rules={[
                            { required: true, message: 'Vui lòng nhập mã khuyến mại!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Khuyến mại (VNĐ)'
                        name='number'
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá trị khuyến mại!' }
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={50000}
                            step={50000}

                        />
                    </Form.Item>
                    <Form.Item
                        label='Số lượng mã'
                        name='quantity'
                        rules={[
                            { required: true, message: 'Vui lòng nhập số lượng mã khuyến mại!' }
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={1}
                        />
                    </Form.Item>
                </Form>

            </Modal>
            <Col span={24}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Quản lý khuyến mại</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                    type='primary'
                    icon={<PlusCircleOutlined />}
                    onClick={() => setIsShowModalAdd(true)}
                >
                    Tạo khuyến mại
                </Button>
            </Col>
            <Col span={24}>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={listCoupon}
                    rowKey={(record) => record.code}

                />
            </Col>
            <Modal
                title='Tạo khuyến mại mới'
                visible={isShowModalAdd}
                onCancel={() => setIsShowModalAdd(false)}
                onOk={() => handleCreateCoupon()}
                destroyOnClose={true}
                confirmLoading={isLoading}
            >
                <Form
                    layout='vertical'
                    form={formAdd}
                    preserve={false}
                >
                    <Form.Item
                        label='Tên khuyến mại'
                        name='name'
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên khuyến mại!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Mã khuyến mại'
                        name='code'
                        rules={[
                            { required: true, message: 'Vui lòng nhập mã khuyến mại!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Khuyến mại (VNĐ)'
                        name='number'
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá trị khuyến mại!' }
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={50000}
                            step={50000}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Số lượng mã'
                        name='quantity'
                        rules={[
                            { required: true, message: 'Vui lòng nhập số lượng mã khuyến mại!' }
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={1}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Row>
    )
}

export default DashboardAdminCoupon


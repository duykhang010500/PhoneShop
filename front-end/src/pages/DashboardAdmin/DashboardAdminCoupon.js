import React, { useState, useEffect } from 'react'
import { Breadcrumb, Row, Col, Table, Button, Modal, Form, Input, InputNumber, Space, Tooltip, Popconfirm, message } from 'antd'
import { HomeOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { actCreateCouponAsync, actDeleteCouponAsync, actGetListCouponAsync, actUpdateCoupon, actUpdateCouponAsync } from '../../store/coupons/action'

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
            key: 'name'
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: 'Giá trị giảm (%)',
            dataIndex: 'number',
            key: 'number'
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
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
                        label='Khuyến mại (%)'
                        name='number'
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá trị khuyến mại!' }
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={1}
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
                        label='Khuyến mại (%)'
                        name='number'
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá trị khuyến mại!' }
                        ]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={1}
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


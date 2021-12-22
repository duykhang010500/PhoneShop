import React, { useEffect, useState } from 'react'
import {
    Row,
    Col,
    Breadcrumb,
    Table,
    Space,
    Button,
    Tooltip,
    Tag,
    Modal,
    Form,
    Radio,
    Typography,
    Avatar,
    Popconfirm,
    message,
    Input,
    Select
} from 'antd';

import { useSelector, useDispatch } from 'react-redux'

import {
    HomeOutlined,
    EyeOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    CloseCircleOutlined,
    SearchOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';

import { FaTruck } from "react-icons/fa"

import { actDeleteOrder, actGetDetailOrderUserAsync, actGetListOrdersUserAsync, actUpdateStatusOrder } from '../../store/orders/action';
import { formatVND } from '../../helpers/priceFormat'

const DashboardAdminOrders = () => {

    const dispatch = useDispatch()
    const [ordersTime, setOrdersTime] = useState('')

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetListOrdersUserAsync(ordersTime)).then(() => {
            setIsLoading(false)
        })
    }, [dispatch, ordersTime])

    // Lấy danh sách orders
    const listOrdersUser = useSelector((state) => state.Orders.listOrdersUser)

    // Lấy chi tiết orders
    const detailOrders = useSelector(state => state.Orders.detailOrder)

    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [ordersSelected, setOrderSelected] = useState('')
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [showModalDetailOrders, setShowModalDetailOrders] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)


    // Lấy chi tiết đơn hàng của customer
    const handleGetDetailOrdersUser = (id) => {
        console.log(id)
        setIsLoading(true)
        dispatch(actGetDetailOrderUserAsync(id)).then(() => {
            setShowModalDetailOrders(true)
        }).then(() => {
            setIsLoading(false)
        })
    }

    useEffect(() => {
        const getTotalPrice = () => {
            const total = detailOrders.reduce((prev, item) => {
                return prev + (item.product_price * item.product_quantity)
            }, 0)
            setTotalPrice(total)
        }
        if (detailOrders) {
            getTotalPrice()
        }
    }, [detailOrders])

    // Cập nhật giá trị radio button trạng thái
    const handleChangeStatusOrder = () => {
        console.log('Change Status!', ordersSelected)
        form
            .validateFields()
            .then((status) => handleSubmit(status))
    }

    // Cập nhật trạng thái đơn hàng
    const handleSubmit = (status) => {
        setConfirmLoading(true)
        dispatch(actUpdateStatusOrder(ordersSelected.order_code, status))
            .then(() => {
                setConfirmLoading(false)
                dispatch(actGetListOrdersUserAsync(ordersTime))
            })
            .finally(() => {
                setShowModalUpdate(false)
            })
    }
    //Xoá đơn hàng
    const handleDeleteOrder = (order_code) => {
        console.log(order_code)
        setIsLoading(true)
        dispatch(actDeleteOrder(order_code))
            .then((res) => {
                if (res.ok) {
                    message.success(res.message)
                } else {
                    message.error(res.message)
                }
                dispatch(actGetListOrdersUserAsync())
            })
            .finally(() => setIsLoading(false))
    }
    // Đóng modal
    const handleCloseModal = () => {
        setShowModalUpdate(false)
        Modal.destroyAll()
    }

    const columns = [
        {
            width: '12%',
            title: 'Mã đơn hàng',
            dataIndex: 'order_code',
            key: 'order_code',
            render: (orderCode) => (
                <Typography.Text strong>
                    {orderCode}
                </Typography.Text>
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Space direction='vertical'>
                            <Input
                                style={{ width: 120 }}
                                autoFocus
                                placeholder='Nhập mã đơn hàng'
                                value={selectedKeys}
                                onChange={(e) => {
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                    confirm({ closeDropdown: false })
                                }}
                                onPressEnter={() => {
                                    confirm()
                                }}
                            // onBlur={() => {
                            //     confirm()
                            // }}
                            >
                            </Input>
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

                    </div>)
            },
            onFilter: (value, record) => {
                return record.order_code.toLowerCase().includes(value.toLowerCase())
            },
            filterIcon: () => {
                return <SearchOutlined />
            }

        },
        {
            title: 'Thông tin khách hàng',
            dataIndex: 'info',
            key: 'info',
            render: (text, record) => {
                return (
                    <div style={{ fontSize: 13 }}>
                        <p><span className='fw-500'>Tên khách hàng:</span> {record.ship.name}</p>
                        <p><span className='fw-500'>Số điện thoại:</span> {record.ship.phone}</p>
                        <p><span className='fw-500'>Email:</span> {record.ship.email}</p>

                        <p><span className='fw-500'>Địa chỉ:</span> {record.ship.address}</p>
                        <p><span className='fw-500'>Thanh toán:</span> {record.ship.method === 1 ? <>Tiền mặt</> : <>VNPAY</>}</p>
                        <p><span className='fw-500'>Ghi chú:</span> {record.ship.note}</p>
                    </div>


                )
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Space direction='vertical'>
                            <Input
                                style={{ width: 380 }}
                                autoFocus
                                placeholder='Nhập tên khách hàng, email hoặc số điện thoại'
                                value={selectedKeys}
                                onChange={(e) => {
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                    confirm({ closeDropdown: false })
                                }}
                                onPressEnter={() => {
                                    confirm()
                                }}
                            // onBlur={() => {
                            //     confirm()
                            // }}
                            >
                            </Input>
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

                    </div>)
            },
            onFilter: (value, record) => {
                return record.ship.phone.toLowerCase().includes(value.toLowerCase()) ||
                    record.ship.name.toLowerCase().includes(value.toLowerCase()) ||
                    record.ship.email.toLowerCase().includes(value.toLowerCase())
            },
            filterIcon: () => <SearchOutlined />
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'created_at',
            key: 'ordersDate',
            render: (text, record) => {
                return <span><ClockCircleOutlined /> {record.created_at}</span>
            },
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at)
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            render: (price) => (
                <Typography.Text
                    strong
                    type="danger"
                >
                    {formatVND(price)}
                </Typography.Text>
            ),
            sorter: (a, b) => a.total - b.total
        },
        ,
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Đang chờ xử lý', value: 1 },
                { text: 'Đang giao hàng', value: 2 },
                { text: 'Đã hoàn thành', value: 3 },
                { text: 'Đã huỷ', value: 0 }
            ],
            onFilter: (value, record) => {
                return record.status === value
            },
            render: tag => {
                if (tag == '0') {
                    return <Tag icon={<CloseCircleOutlined />} color="error">
                        Đã huỷ
                    </Tag>
                }
                if (tag == '1') {
                    return <Tag icon={<SyncOutlined spin />} color="processing">
                        Đang chờ xử lý
                    </Tag>
                }
                if (tag == '2') {
                    return <Tag icon={<FaTruck style={{ paddingTop: '4px', marginRight: '4px' }} />} color="warning">
                        Đang giao hàng
                    </Tag>
                }
                if (tag == '3') {
                    return <Tag icon={<CheckCircleOutlined />} color="success">
                        Đã hoàn thành
                    </Tag>
                }
            }
        },
        {
            width: '10%',
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="small">
                    <Tooltip title="Cập nhật">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setShowModalUpdate(true)
                                setOrderSelected(record)
                                form.setFieldsValue({
                                    status: record.status
                                })
                            }}
                        >
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xem chi tiết">
                        <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            style={{
                                backgroundColor: "#52c41a",
                                border: "none"
                            }}
                            onClick={() => {
                                setOrderSelected(record.order_code)
                                handleGetDetailOrdersUser(record.order_code)
                            }}
                        >
                        </Button>
                    </Tooltip>
                    <Tooltip title="Xoá đơn hàng">
                        <Popconfirm
                            placement="topRight"
                            title={`Xóa đơn hàng #${record.order_code}`}
                            onConfirm={() => handleDeleteOrder(record.order_code)}
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
    ];

    return (
        <Row
            gutter={[20, 20]}
        >
            {/* Đường dẫn */}
            <Col span={24}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
                </Breadcrumb>
            </Col>

            {/* Modal cập nhật trạng thái */}
            <Modal
                title={`Cập nhật trạng thái đơn hàng #${ordersSelected.order_code}`}
                okText="Cập nhật"
                visible={showModalUpdate}
                onCancel={handleCloseModal}
                onOk={handleChangeStatusOrder}
                confirmLoading={confirmLoading}
                destroyOnClose={true}
                width={650}
            >
                <Form
                    form={form}
                    name='form-update-status'
                // preserve={false}
                >
                    <Form.Item
                        name="status"
                    >
                        <Radio.Group>
                            <Radio value={1}>Đang chờ xử lý</Radio>
                            <Radio value={2}>Đang giao hàng</Radio>
                            <Radio value={3}>Đã hoàn thành</Radio>
                            <Radio value={0}>Huỷ đơn</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>


            {/* Modal chi tiết đơn hàng  */}

            <Modal
                title={`Chi tiết đơn hàng #${ordersSelected}`}
                visible={showModalDetailOrders}
                onOk={() => setShowModalDetailOrders(false)}
                onCancel={() => setShowModalDetailOrders(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                destroyOnClose={true}
            >
                {
                    !detailOrders ? (
                        <span>Đang tải thông tin</span>
                    ) : (
                        <div className="order__detail">
                            {/* <div className="order__detail-customer">
                                <div className="order__detail-customer--title">
                                    Thông tin khách hàng
                                </div>
                                <div className="order__detail-customer--detail">
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Họ và tên: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.name}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Địa chỉ nhận hàng: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.address}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Số điện thoại: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.phone}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Ngày đặt hàng: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.created_at}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Ghi chú: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.note}
                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Mã khuyến mại: &nbsp;
                                        </span>
                                        {
                                            detailOrders[0].order.coupon ? (
                                                <>{detailOrders[0].order.coupon} (Giảm {formatVND(detailOrders[0].order.coupon_number)})</>
                                            ) : <>Không có</>
                                        }

                                    </div>
                                    <div className="order__detail-customer--info">
                                        <span>
                                            Thanh toán: &nbsp;
                                        </span>
                                        {
                                            detailOrders[0].ship.method === 1 ? <>Tiền mặt</> : <>VNPAY</>

                                        }
                                    </div>
                                </div>
                            </div> */}
                            <div className="order__detail-product">
                                <div className="order__detail-product--title">
                                    Thông tin sản phẩm
                                </div>
                                {
                                    detailOrders.map((item, index) => {
                                        return (
                                            <div key={index} className="order__detail-product--detail">
                                                <div className="order__detail-product--info">
                                                    <Avatar
                                                        shape="square"
                                                        src={item.product_image}
                                                        style={{ width: 75, height: 75 }}
                                                    />
                                                    <div className="order__detail-product--name">
                                                        {item.product_name} ({item.product_color})
                                                    </div>
                                                    <span className="order__detail-product--quantity">X {item.product_quantity}</span>
                                                    <div className="order__detail-product--price">
                                                        {formatVND(+item.product_price)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="order__detail-total">
                                {
                                    detailOrders[0].order.coupon_number &&
                                    <>
                                        <span>Khuyến mại: </span>
                                        <span className="total-price">
                                            - {formatVND(detailOrders[0].order.coupon_number)}
                                        </span>
                                    </>
                                }
                            </div>
                            <div className="order__detail-total">
                                <span>Thành tiền: </span>
                                <span className="total-price">
                                    {formatVND(totalPrice - detailOrders[0].order.coupon_number)}
                                </span>
                            </div>
                        </div>
                    )
                }
            </Modal>
            <Col
                span={24}
                style={{ textAlign: 'right' }}
            >
                <Space>
                    <Typography.Text strong>
                        Lọc theo:
                    </Typography.Text>
                    <Select
                        style={{ width: 150 }}
                        defaultValue=''
                        onChange={(value) => setOrdersTime(value)}
                        size='large'
                    >
                        <Select.Option
                            value=''
                        >
                            Tất cả
                        </Select.Option>
                        <Select.Option
                            value='week'
                        >
                            Trong tuần
                        </Select.Option>
                        <Select.Option
                            value='month'
                        >
                            Trong tháng
                        </Select.Option>
                        <Select.Option
                            value='last-month'
                        >
                            Tháng trước
                        </Select.Option>
                        <Select.Option
                            value='year'
                        >
                            Trong năm
                        </Select.Option>
                    </Select>
                </Space>

            </Col>

            {/* Bảng đơn hàng */}
            <Col span={24}>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={listOrdersUser}
                    rowKey={(record) => record.order_code}
                    pagination={{
                        showSizeChanger: true,
                        size: 'default'
                    }}
                />
            </Col>
        </Row>
    )
}

export default DashboardAdminOrders

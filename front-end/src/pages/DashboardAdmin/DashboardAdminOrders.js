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
    Avatar
} from 'antd';

import { useSelector, useDispatch } from 'react-redux'

import {
    HomeOutlined,
    EyeOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    EditOutlined,
} from '@ant-design/icons';

import { FaTruck } from "react-icons/fa"

import { actGetDetailOrderUserAsync, actGetListOrdersUserAsync, actUpdateStatusOrder } from '../../store/orders/action';
import { formatVND } from '../../helpers/priceFormat'

const DashboardAdminOrders = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetListOrdersUserAsync()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

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
        dispatch(actGetDetailOrderUserAsync(id)).then(() => {
            setShowModalDetailOrders(true)
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
                dispatch(actGetListOrdersUserAsync())
            })
            .finally(() => {
                setShowModalUpdate(false)
            })
    }

    // Đóng modal
    const handleCloseModal = () => {
        setShowModalUpdate(false)
        Modal.destroyAll()
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order_code',
            key: 'order_code',
            render: (orderCode) => (
                <Typography.Text strong>
                    #{orderCode}
                </Typography.Text>
            )
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'created_at',
            key: 'created_at',
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
            )
        },
        ,
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: tag => {
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
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
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
                            <div className="order__detail-customer">
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
                                            Thanh toán: &nbsp;
                                        </span>
                                        {detailOrders[0].ship.method}
                                    </div>
                                </div>
                            </div>
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
                                <span>Thành tiền: </span>
                                <span className="total-price">
                                    {formatVND(totalPrice)}
                                </span>
                            </div>
                        </div>
                    )
                }
            </Modal>

            {/* Bảng đơn hàng */}
            <Col span={24}>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={listOrdersUser}
                    rowKey={(record) => record.order_code}
                />
            </Col>

        </Row>
    )
}

export default DashboardAdminOrders

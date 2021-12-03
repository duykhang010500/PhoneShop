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
    Typography
} from 'antd';

import { useSelector, useDispatch } from 'react-redux'

import {
    HomeOutlined,
    EyeOutlined,
    CheckOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    EditOutlined,
} from '@ant-design/icons';

import { FaTruck } from "react-icons/fa"

import { actGetDetailOrderUserAsync, actGetListOrdersUserAsync, actUpdateStatusOrder } from '../../store/orders/action';
import { convertNewPrice, formatVND } from '../../helpers/priceFormat'

const DashboardAdminOrders = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetListOrdersUserAsync()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const [ordersSelected, setOrderSelected] = useState('')
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const listOrdersUser = useSelector((state) => state.Orders.listOrdersUser)

    const handleGetDetailOrders = (id) => {
        console.log(id)
    }

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
                            onClick={() => handleGetDetailOrders(record.order_code)}
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
                            <Radio value={2}>Đang vận chuyển</Radio>
                            <Radio value={3}>Đã hoàn thành</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Bảng đơn hàng */}
            <Col span={24}>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={listOrdersUser}
                />
            </Col>

        </Row>
    )
}

export default DashboardAdminOrders

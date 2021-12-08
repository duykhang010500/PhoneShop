import React, { useState, useEffect } from 'react'
import {
    Breadcrumb,
    Col,
    Row,
    Table,
    Space,
    Button,
    message,
    Avatar,
    Tooltip,
    Popconfirm,
    Typography
} from 'antd'
import { Link } from 'react-router-dom'
import {
    HomeOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    FormOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { actDeleteProductAsync, actGetAllProductAsync } from '../../store/products/actions';
import { formatVND } from '../../helpers/priceFormat'


const DashboardAminProducts = () => {

    const dispatch = useDispatch()
    const [isFetchingProduct, setIsFetchingProduct] = useState(false)

    useEffect(() => {
        dispatch(actGetAllProductAsync())
    }, [dispatch])

    const listProduct = useSelector((state) => state.Products.list)

    //Columns in table
    const columns = [
        {
            title: 'Ảnh',
            render: (text, record) => (
                <Avatar
                    style={{ width: 50, height: 50 }}
                    shape="square"
                    src={record.image}
                />
            )

        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Typography.Text
                    strong
                >
                    {record.name}
                </Typography.Text>
            )
        },
        {
            title: 'Thương hiệu',
            // dataIndex: ''
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <Typography.Text
                    type="danger"
                    strong
                >
                    {formatVND(record.price)}
                </Typography.Text>
            )
        },
        {
            title: 'Khuyến mại (%)',
            dataIndex: 'discount',
            key: 'discount',
            render: (text, record) => (
                <Typography.Text strong>
                    {record.discount}%
                </Typography.Text>
            )
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Tooltip title="Cập nhật">
                        <Link to={`/admin/products/update/${record.slug}`}>
                            <Button
                                type="primary"
                                icon={<FormOutlined />}
                                className="btn-primary"
                            >
                            </Button>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Popconfirm
                            placement="topRight"
                            title={`Xóa điện thoai ${record.name}`}
                            onConfirm={() => handleDeleteProduct(record.slug)}
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

    //Delete Product
    const handleDeleteProduct = (slug) => {
        console.log('Xóa ', slug)
        setIsFetchingProduct(true)
        dispatch(actDeleteProductAsync(slug)).then(() => {
            message.success('Xóa sản phẩm thành công!')
            dispatch(actGetAllProductAsync()).then(() => {
                setIsFetchingProduct(false)
            })
        })
    }

    //Render
    return (
        <Row gutter={[20, 10]}>
            <Col span={24}>
                <Breadcrumb style={{ marginBottom: '2rem' }}>
                    <Breadcrumb.Item href="/admin">
                        <HomeOutlined />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Sản phẩm
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        Quản lý sản phẩm
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col
                span={24}
                style={{ textAlign: 'right' }}
            >
                <Space>
                    <Button
                        size="large"
                        type="primary"
                        icon={<PlusCircleOutlined />}

                    >
                        <Link to='/admin/products/create' style={{ color: 'white' }}>
                            &nbsp; Thêm sản phẩm
                        </Link>
                    </Button>
                </Space>
            </Col>
            <Col span={24}>
                <Table
                    columns={columns}
                    dataSource={listProduct}
                    rowKey={(record) => record.id}
                    loading={isFetchingProduct}
                />
            </Col>

        </Row>
    )
}

export default DashboardAminProducts

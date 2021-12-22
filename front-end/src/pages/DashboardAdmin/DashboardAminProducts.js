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
    Typography,
    Input,
    Switch
} from 'antd'
import { Link } from 'react-router-dom'
import {
    HomeOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    FormOutlined,
    SearchOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { actDeleteProductAsync, actGetAllProductAsync, actGetAllProductNotPaging, actUpdateProductAsync } from '../../store/products/actions';
import { formatVND } from '../../helpers/priceFormat'


const DashboardAminProducts = () => {

    const dispatch = useDispatch()
    const [isFetchingProduct, setIsFetchingProduct] = useState(false)

    useEffect(() => {
        setIsFetchingProduct(true)
        dispatch(actGetAllProductNotPaging())
            .finally(() => setIsFetchingProduct(false))
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
                >
                    {record.name}
                </Typography.Text>
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Space direction='vertical'>
                            <Input
                                autoFocus
                                placeholder='Nhập tên sản phẩm'
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

                    </div>
                )
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brand',
            key: 'brand',
            render: (text, record) => (
                <Typography.Text >
                    {record.brand.name}
                </Typography.Text>
            ),
            filters: [
                { text: 'Realmi', value: 'Realmi' },
                { text: 'Vivo', value: 'Vivo' },
                { text: 'Asus', value: 'Asus' },
                { text: 'Xiaomi', value: 'Xiaomi' },
                { text: 'Apple', value: 'Apple' },
                { text: 'Oppo', value: 'Oppo' },
                { text: 'Nokia', value: 'Nokia' },
                { text: 'Samsung', value: 'Samsung' }

            ],
            onFilter: (value, record) => {
                return record.brand.name === value
            }
        },

        {
            title: 'Giá',
            dataIndex: 'price',
            defaultSortOrder: 'desc',
            sorter: (a, b) => a.price - b.price,
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
            defaultSortOrder: 'desc',
            sorter: (a, b) => a.discount - b.discount,
            render: (text, record) => (
                <Typography.Text>
                    {record.discount}%
                </Typography.Text>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => {
                return (
                    <Tooltip title='Thay đổi trạng thái'>
                        <Switch
                            defaultChecked={status}
                            onChange={() => handleChangeStatus(status, record)}
                        />
                    </Tooltip>
                )
            },
            filters: [
                { text: 'Đang kích hoạt', value: 1 },
                { text: 'Đang ẩn', value: 0 },
            ],
            onFilter: (value, record) => {
                return record.status === value
            }
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            key: 'sold',
            sorter: (a, b) => a.sold - b.sold
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
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
                            title={`Xóa điện thoại ${record.name}`}
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

    const handleChangeStatus = (status, record) => {
        // console.log('Change: ', status, record)
        setIsFetchingProduct(true)
        if (status === 1) {
            let newProduct = { ...record, status: 0 }
            dispatch(actUpdateProductAsync(newProduct.slug, newProduct))
                .then(() => {
                    dispatch(actGetAllProductNotPaging())
                    setIsFetchingProduct(false)
                    message.success('Đã thay đổi trạng thái!')
                })
        } else {
            let newProduct = { ...record, status: 1 }
            dispatch(actUpdateProductAsync(newProduct.slug, newProduct))
                .then(() => {
                    dispatch(actGetAllProductNotPaging())
                    setIsFetchingProduct(false)
                    message.success('Đã thay đổi trạng thái!')

                })
        }
    }

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
        <Row gutter={[20, 10]} style={{ marginBottom: 200 }}>
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
                    loading={isFetchingProduct}
                    columns={columns}
                    dataSource={listProduct}
                    rowKey={(record) => record.id}
                    pagination={{
                        showSizeChanger: true
                    }}
                />
            </Col>

        </Row>
    )
}

export default DashboardAminProducts


import React, { useEffect, useState } from 'react'
import { Table, Input, Tooltip, Switch, message, Space, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actChangeStatusCustomerAsync, actGetListCustomerAsync } from '../../store/customers/action'
import { SearchOutlined } from '@ant-design/icons'


const DashboardAdminCustomers = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetListCustomerAsync()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    const listCustomer = useSelector(state => state.Customer.list)

    //Columns
    const columns = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'image',
            key: 'image',
            render: image => (
                <img
                    src={image}
                    alt={image}
                    style={{ width: 50, height: 50 }}
                />
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 4 }}>
                        <Space direction='vertical'>
                            <Input
                                placeholder='Nhập email'
                                value={selectedKeys}
                                onChange={(e) => {
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                    confirm({ closeDropdown: false })
                                }}
                                onPressEnter={() => confirm()}
                            />
                            <Space>
                                <Button
                                    type='primary'
                                    onClick={() => confirm()}
                                    size='small'
                                >
                                    OK
                                </Button>
                                <Button
                                    type='primary'
                                    onClick={() => clearFilters()}
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
            filterIcon() {
                return <SearchOutlined />
            },
            onFilter(value, record) {
                return record.email.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <div style={{ padding: 4 }}>
                        <Space direction='vertical'>
                            <Input
                                placeholder='Nhập tên khách hàng'
                                value={selectedKeys}
                                onChange={(e) => {
                                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                                    confirm({ closeDropdown: false })
                                }}
                                onPressEnter={() => confirm()}
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
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            key: 'sex',
            render: (gender) => {
                if (gender === 'male') {
                    return <span>Nam</span>
                } else if (gender === 'female') {
                    return <span>Nữ</span>
                }
            },
            filters: [
                { text: 'Nam', value: 'male' },
                { text: 'Nữ', value: 'female' },
            ],
            onFilter: (value, record) => record.sex === value
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
            sorter: (a, b) => new Date(a.dob) - new Date(b.dob)
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at)
        },
        // {
        //     title: 'Trạng thái',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status, record) => {
        //         return (
        //             <Tooltip title='Thay đổi trạng thái'>
        //                 <Switch
        //                     defaultChecked={status}
        //                     onChange={() => (handleChangeStatusCustomer(status, record))}
        //                 />
        //             </Tooltip>
        //         )
        //     },
        //     filters: [
        //         { text: 'Đang kích hoạt', value: 1 },
        //         { text: 'Đang Ẩn', value: 0 },

        //     ],
        //     onFilter: (value, record) => record.status === value
        // }
    ]

    const handleChangeStatusCustomer = (status, record) => {
        setIsLoading(true)
        if (status === 1) {
            dispatch(actChangeStatusCustomerAsync(record.email, { status: 0 }))
                .then(() => message.success('Thay đổi trạng thái thành công!'))
            dispatch(actGetListCustomerAsync())
                .finally(() => setIsLoading(false))
        } else {
            dispatch(actChangeStatusCustomerAsync(record.email, { status: 1 }))
                .then(() => message.success('Thay đổi trạng thái thành công!'))
            dispatch(actGetListCustomerAsync())
                .finally(() => setIsLoading(false))
        }
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={listCustomer}
                rowKey={(record) => record.id}
                loading={isLoading}
            />
        </>
    )
}

export default DashboardAdminCustomers

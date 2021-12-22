
import React, { useEffect, useState } from 'react'
import { Table, Avatar, Tooltip, Switch, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actChangeStatusCustomerAsync, actGetListCustomerAsync } from '../../store/customers/action'


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
            key: 'email'
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            key: 'sex',
            render: (gender) => {
                if (gender === 'male') {
                    return <span>Nam</span>
                } else {
                    return <span>Nữ</span>

                }
            }
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob'
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'created_at',
            key: 'created_at'
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
                            onChange={() => (handleChangeStatusCustomer(status, record))}
                        />
                    </Tooltip>
                )
            }
        }
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

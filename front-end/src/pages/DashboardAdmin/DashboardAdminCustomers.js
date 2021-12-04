
import React, { useEffect, useState } from 'react'
import { Table, Avatar } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actGetListCustomerAsync } from '../../store/customers/action'


const DashboardAdminCustomers = () => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        dispatch(actGetListCustomerAsync()).then(() => {
            setIsLoading(false)
        })
        return () => {
            setIsLoading(false)
        }
    }, [dispatch])

    const listCustomer = useSelector(state => state.Customer.list)

    //Columns
    const columns = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'image',
            key: 'image',
            render: image => (
                <Avatar
                    src={image}
                    shape="square"
                    alt={image}
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
            key: 'sex'
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
        }
    ]

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

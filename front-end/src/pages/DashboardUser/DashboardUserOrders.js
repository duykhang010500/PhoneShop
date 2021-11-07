import React from 'react'
import {
    Table
} from 'antd'
import { useAuthenticated } from '../../hooks/useAuthenticate'
const DashboardUserOrder = () => {
    useAuthenticated()
    const columns = [
        {
            title: 'Mã đơn hàng',
            // dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày mua',
            // dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Sản phẩm',
            // dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tổng tiền'
        },
        {
            title: 'Trạng thái đơn hàng'
        },
        {
            title: 'Hành động'
        }
    ];
    return (
        <Table
            columns={columns}
            dataSource={[]}
            loading
        />
    )
}

export default DashboardUserOrder

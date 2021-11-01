import React from 'react'
import { Input } from 'antd'

const HeaderSearch = () => {
    const { Search } = Input
    return (
        <Search
            size="large"
            placeholder="Nhập tên sản phẩm cần tìm..."
            enterButton
            // loading
            allowClear
        />
    )
}

export default HeaderSearch

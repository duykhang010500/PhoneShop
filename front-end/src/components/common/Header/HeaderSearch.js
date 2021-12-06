import React from 'react'
import { Input, message } from 'antd'
import { useHistory } from 'react-router-dom'

const HeaderSearch = () => {

    const { Search } = Input
    const history = useHistory()

    // xử lý tìm kiếm sản phẩm
    const handleSearch = (value) => {
        if (value === '') {
            // message.info('Vui lòng nhập từ khoá cần tìm!')
            return
        }
        history.push('/search?q=' + value)
    }

    return (
        <div className="header__menu-search">
            <Search placeholder="Bạn cần tìm gì?"
                allowClear
                enterButton
                onSearch={handleSearch}
            />
        </div>
    )
}

export default HeaderSearch

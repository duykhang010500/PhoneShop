import React from 'react'
import { Select } from 'antd'
import { Link } from 'react-router-dom'
import { QuestionCircleOutlined, GiftOutlined } from '@ant-design/icons'

const HeaderTop = () => {
    return (
        <div className="header__top">
            <div className="container">
                <div className="header__top-wrapper">
                    <div className="header__top-selects">
                        <Select defaultValue="vnd">
                            <Select.Option key="vnd">
                                VNĐ
                            </Select.Option>
                        </Select>
                    </div>
                    <div className="header__top-links">
                        <div className="header__top-links--item">
                            <Link to="/help">
                                <QuestionCircleOutlined />
                                &nbsp;Hỗ trợ
                            </Link>
                        </div>
                        <div className="header__top-links--item">
                            <Link to="/help">
                                <GiftOutlined />
                                &nbsp;Khuyến mại
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop

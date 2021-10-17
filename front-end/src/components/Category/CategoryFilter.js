import React from 'react'

import {
    Col,
    Row,
    Typography,
    Checkbox,

} from 'antd'

const CategoryFilter = () => {
    const Brand = [
        {
            title: 'Tất cả',
            value: '1',
            defaultChecked: true
        },
        {
            title: 'Apple',
            value: '2',
            defaultChecked: false
        },
        {
            title: 'Samsung',
            value: '3',
            defaultChecked: false
        },
        {
            title: 'Nokia',
            value: '4',
            defaultChecked: false
        },
        {
            title: 'Xiaome',
            value: '5',
            defaultChecked: false
        },
        {
            title: 'Realme',
            value: '6',
            defaultChecked: false
        }
    ]
    const Price = ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 10 triệu', 'Trên 10 triệu']

    const Feature = ['Chống nước', 'Bảo mật vân tay', 'Nhận diện khuôn mặt', 'Sạc nhanh']

    return (
        <Row>
            <Typography.Title level={5}>
                Hãng sản xuất
            </Typography.Title>
            <Checkbox.Group style={{ width: '100%', }}>
                <Row>
                    {
                        Brand.map((item, index) => {
                            return (
                                <Col
                                    span={12}
                                    key={index}>
                                    <Checkbox
                                        value={item.value}
                                        defaultChecked
                                    >
                                        {item.title}
                                    </Checkbox>
                                </Col>

                            )
                        })
                    }
                </Row>
            </Checkbox.Group>
            <Row>
                <Typography.Title level={5}>
                    Mức giá
                </Typography.Title>
                <Checkbox.Group style={{ width: '100%', }}>
                    <Row>
                        {
                            Price.map((item, index) => {
                                return (
                                    <Col span={24}>
                                        <Checkbox value={item}>{item}</Checkbox>
                                    </Col>

                                )
                            })
                        }
                    </Row>
                </Checkbox.Group>
            </Row>
            <Row>
                <Typography.Title level={5}>
                    Tính năng đặc biệt
                </Typography.Title>
                <Checkbox.Group style={{ width: '100%', }}>
                    <Row>
                        {
                            Feature.map((item, index) => {
                                return (
                                    <Col span={24}>
                                        <Checkbox value={item}>{item}</Checkbox>
                                    </Col>

                                )
                            })
                        }
                    </Row>
                </Checkbox.Group>
            </Row>
        </Row>
    )
}

export default CategoryFilter

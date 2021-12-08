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


    return (
        <Row
            style={{
                backgroundColor: "#fff",
                borderRadius: "1rem",
                padding: "1.5rem"
            }}
        >
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
        </Row>
    )
}

export default CategoryFilter

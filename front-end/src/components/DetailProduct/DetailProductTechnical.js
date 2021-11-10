import React from 'react'
import { Descriptions } from 'antd'
import { convertProductInfo } from '../../helpers/convertInfo'
export default function DetailProductTechnical({ product }) {

    const technicalProduct = product.product_info
    delete technicalProduct["id"]
    delete technicalProduct["updated_at"]
    delete technicalProduct["created_at"]

    return (
        <Descriptions
            title="Thông số kỹ thuật"
            bordered
            column={{ lg: 1, md: 1, sm: 1, xs: 1 }}
            layout="horizontal"
        >
            {
                Object.keys(technicalProduct).map((key, index) => {
                    return (
                        <Descriptions.Item
                            key={index}
                            label={convertProductInfo(key)}
                        >
                            {technicalProduct[key]}
                        </Descriptions.Item>
                    )
                })
            }
        </Descriptions>
    )
}

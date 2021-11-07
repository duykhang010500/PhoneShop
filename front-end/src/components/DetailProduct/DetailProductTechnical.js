
import React from 'react'
import {
    Descriptions
} from 'antd'
import { convertProductInfo } from '../../helpers/convertInfo'
export default function DetailProductTechnical({ product }) {

    const technicalProduct = product.product_info
    console.log(technicalProduct)
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
                Object.keys(technicalProduct).map((key) => {
                    return (
                        <Descriptions.Item label={convertProductInfo(key)}>
                            {technicalProduct[key]}
                        </Descriptions.Item>
                    )
                })
            }
        </Descriptions>
    )
}

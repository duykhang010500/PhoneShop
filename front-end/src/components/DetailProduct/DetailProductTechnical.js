
import React from 'react'
import { 
    Descriptions
} from 'antd'
export default function DetailProductTechnical() {
    return (
        <Descriptions
            title="Thông số kỹ thuật"
            bordered
            column={{ lg: 1, md: 1, sm: 1, xs: 1 }}
            layout="horizontal"
        >
            <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
            <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
            <Descriptions.Item label="time">18:00:00</Descriptions.Item>
            <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
            <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
            <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        </Descriptions>
    )
}

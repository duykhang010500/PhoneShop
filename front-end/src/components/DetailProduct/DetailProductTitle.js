import {
    Space,
    Breadcrumb,
    Typography,
    Rate
} from 'antd'

import { HomeOutlined } from '@ant-design/icons'

export default function DetailProductTitle({ product }) {
    return (
        <Space direction="vertical">
            {/* <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <HomeOutlined /> Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/dien-thoai-di-dong">
                    Điện thoại di động
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Typography.Text strong>
                        {product.brand.name}
                    </Typography.Text>
                </Breadcrumb.Item>
            </Breadcrumb> */}

            <Space size="large">
                <Space size="middle" wrap>
                    <Typography.Title level={4}>
                        {product.name}
                    </Typography.Title>
                    <Space>
                        <Rate disabled value={4.5} style={{ fontSize: "1.4rem" }} />
                        <Typography.Text strong>
                            4 đánh giá
                        </Typography.Text>
                    </Space>
                </Space>
            </Space>
        </Space>
    )
}
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
                    <Typography.Title level={3}>
                        {product.name}
                    </Typography.Title>
                    <Space>
                        {
                            product.ratings != 0 ?
                                <Rate disabled value={0} style={{ fontSize: "1.4rem" }} /> :
                                <Rate disabled value={0} style={{ fontSize: "1.4rem" }} />
                        }
                        <Typography.Text strong>
                            {product.ratings.length} đánh giá
                        </Typography.Text>
                    </Space>
                </Space>
            </Space>
        </Space>
    )
}
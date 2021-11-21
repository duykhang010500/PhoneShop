import {
    Row,
    Col,
    Space,
    Typography,
    Radio,
    Button,
    Tooltip,
    Image
} from 'antd'

import {
    HeartFilled,
    HeartOutlined
} from '@ant-design/icons'

import {
    useDispatch
} from 'react-redux'

import { CheckCircleTwoTone } from '@ant-design/icons'
import {
    convertNewPrice, formatVND
} from '../../helpers/priceFormat'

import { actAddToCart } from '../../store/cart/action'
import { useState } from 'react'

export default function DetailProductInfo({ product }) {
    const dispatch = useDispatch()

    const [productColor, setProductColor] = useState('')

    const handleChangeColor = (e) => {
        console.log(e.target.value)
        setProductColor(e.target.value)
    }

    const handleAddToCart = (product, color) => {
        if (!productColor) {
            alert('Vui lòng chọn màu sắc sản phẩm')
            return
        }
        // console.log(product)
        const productWithColor = { ...product, color }
        console.log(productWithColor)
        dispatch(actAddToCart(productWithColor))
    }

    return (
        <Row gutter={[40, 40]}>
            <Col md={10} xs={24}>
                <img src={product.image} />
            </Col>
            <Col md={14} xs={24}>
                <Space direction="vertical" size="middle">
                    <Space size="middle">
                        <Typography.Title level={4} type="danger">
                            {
                                formatVND(convertNewPrice(product.price, product.discount))
                            }
                        </Typography.Title>
                        <Typography.Text strong italic>
                            <del>Giá niêm yết: {formatVND(product.price)}</del>
                        </Typography.Text>
                    </Space>
                    <Typography.Text strong>
                        <i className="fas fa-shipping-fast"></i>
                        &nbsp;
                        Miễn phí vận chuyển toàn quốc
                    </Typography.Text>
                    <Space direction="vertical">
                        <Typography.Text strong>
                            KHUYẾN MÃI
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Tặng gói iCloud 50GB miễn phí 3 tháng
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Giảm ngay 20% Ốp lưng chính hãng khi mua kèm iPhone
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Giảm đến 300.000đ khi mua bảo hành (rơi vỡ + vào nước) kèm máy
                        </Typography.Text>
                    </Space>

                    {/* product color */}
                    <Radio.Group>
                        <Space
                            size="large"
                            onChange={handleChangeColor}
                        >
                            {
                                product.attributes.map((item) => {
                                    return (
                                        <Radio.Button
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.name}
                                        </Radio.Button>
                                    )
                                })
                            }
                        </Space>
                    </Radio.Group>

                    {/* button add to cart */}
                    <Button
                        type="danger"
                        size="large"
                        onClick={() => handleAddToCart(product, productColor)}
                    >
                        Chọn mua
                    </Button>

                </Space>
            </Col>
        </Row>
    )
}
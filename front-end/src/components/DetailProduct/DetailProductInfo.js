import {
    Row,
    Col,
    Space,
    Typography,
    Radio,
    Button,
    Tooltip,

} from 'antd'

import {
    HeartFilled,
    HeartOutlined
} from '@ant-design/icons'

import {
    useDispatch, useSelector
} from 'react-redux'

import { CheckCircleTwoTone } from '@ant-design/icons'
import {
    convertNewPrice, formatVND
} from '../../helpers/priceFormat'

import { actAddToCart } from '../../store/cart/action'
import { useEffect, useState } from 'react'
import { actAddToWishList, actDeleteItemInWishListAsync } from '../../store/wishList/action'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import './styles.css';
import { openNotificationWithIcon } from '../../helpers/notification'
SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);


export default function DetailProductInfo() {

    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const [productColor, setProductColor] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const myWishList = selector.WishList
    const product = selector.Products.detailProduct.data

    useEffect(() => {
        if (myWishList.find(item => item.product_id === product.id)) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [myWishList])

    if (!product) {
        return null
    }
    if (!myWishList) {
        return null
    }


    const handleChangeColor = (e) => {
        setProductColor(e.target.value)
    }

    const handleAddToCart = (product, color) => {
        if (!productColor) {
            openNotificationWithIcon('error', 'Hãy chọn màu của sản phẩm!')
            return
        }
        const productWithColor = { ...product, color }
        dispatch(actAddToCart(productWithColor))
    }

    const handleLikeProduct = (id) => {
        if (!localStorage.getItem('access_token')) {
            openNotificationWithIcon('error', 'Vui lòng đăng nhập để sử dụng tính năng này!')
            return
        }
        setIsLiked(true)
        setIsLoading(true)
        dispatch(actAddToWishList(id))
        openNotificationWithIcon('success', 'Đã thích!')

    }

    const handleUnLikeProduct = (id) => {
        setIsLiked(false)
        setIsLoading(true)
        dispatch(actDeleteItemInWishListAsync(id))
        openNotificationWithIcon('error', 'Đã bỏ thích!')


    }


    // Covert Array Image
    const formatImg = product.images_product
    const galleryImage = [product.image, ...formatImg]
    // console.log('ảnh đã format', galleryImage)

    return (
        <Row gutter={[40, 40]}>
            <Col
                xs={24}
                md={10}
            >
                <div className="gallery">
                    <div className="swiper-top">
                        <Swiper
                            style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
                            spaceBetween={10}
                            navigation={true}
                            loop
                            thumbs={{ swiper: thumbsSwiper }}
                            className="mySwiper2"
                        >
                            {
                                galleryImage.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index} className="item-gallery">
                                            <img src={item} alt={item} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        className="mySwiper"
                    >
                        {
                            galleryImage.map((item, index) => {
                                return (
                                    <SwiperSlide key={index} className="item-gallery">
                                        <img src={item} alt={item} />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </div>
            </Col>
            <Col md={14} xs={24}>
                <Space direction="vertical" size="middle">
                    <Space size="middle" direction="vertical">
                        <Space direction="horizontal">
                            <Typography.Title level={4} type="danger">
                                {
                                    formatVND(convertNewPrice(product.price, product.discount))
                                }
                            </Typography.Title>
                            <Typography.Text strong italic>
                                <del>Giá niêm yết: {formatVND(product.price)}</del>
                            </Typography.Text>
                        </Space>
                        {
                            isLiked ? (
                                <Space>
                                    <Tooltip title="Bỏ thích">
                                        <HeartFilled
                                            style={{ cursor: 'pointer', color: 'rgb(255, 66, 78)', fontSize: '2rem' }}
                                            onClick={() => handleUnLikeProduct(product.id)}

                                        />
                                    </Tooltip>
                                    <Typography.Text strong>
                                        Đã thích
                                    </Typography.Text>
                                </Space>
                            ) : (
                                <Space>
                                    <Tooltip title="Yêu thích">
                                        <HeartOutlined
                                            style={{ cursor: 'pointer', fontSize: '2rem' }}
                                            onClick={() => handleLikeProduct(product.id)}
                                        />
                                    </Tooltip>
                                    Thích
                                </Space>
                            )
                        }
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
                            Giảm ngay 20% Ốp lưng chính hãng khi mua kèm điện thoại
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Giảm đến 300.000đ khi mua bảo hành (rơi vỡ + vào nước) kèm máy
                        </Typography.Text>
                        <Typography.Text>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;
                            Giảm thêm 200.000đ cho khách hàng đã từng mua hàng tại đây
                        </Typography.Text>
                    </Space>

                    {/* product color */}
                    <Radio.Group>
                        <Space
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
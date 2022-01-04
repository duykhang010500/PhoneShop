import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import dateFormat from 'dateformat'
import querystring from 'qs'
import crypto from 'crypto'

import {
    Breadcrumb,
    Typography,
    Row,
    Col,
    Form,
    Button,
    Input,
    Select,
    Radio,
    Space,
    Card,
    Avatar,
    Badge,
    Divider,
    message
} from 'antd'

import {
    HomeOutlined,
    MailOutlined,
    UserOutlined,
    PhoneOutlined,
    EditOutlined
} from '@ant-design/icons'



import { useDispatch, useSelector } from 'react-redux'
import { convertNewPrice, formatVND } from '../helpers/priceFormat'
import { actMakeNewOrder } from '../store/orders/action'
import { actDeleteCart } from '../store/cart/action'
import { actCheckCoupon } from '../store/coupons/action'

const convertPriceWithCoupon = (totalPrice, couponValue) => {
    return totalPrice - couponValue
}


const Checkout = () => {

    //Destructing Item antd
    const { Option } = Select
    const { Meta } = Card

    const dispatch = useDispatch()
    const history = useHistory()
    const [payment, setPayment] = useState('Tiền mặt')
    const [form] = Form.useForm()
    const selector = useSelector(state => state)

    const [isLoading, setIsLoading] = useState(false)
    const [coupon, setCoupon] = useState(null)
    const [couponCode, setCouponCode] = useState('')
    const [isCheckCoupon, setIsCheckCoupon] = useState(false)

    //Get Cart
    const cart = selector.Cart.cart
    const [totalPrice, setTotalPrice] = useState(0)

    //State province
    const [listProvince, setListProvince] = useState([])
    const [provinceCode, setProvinceCode] = useState(null)

    //State district
    const [listDistrict, setListDistrict] = useState([])
    const [districtCode, setDistrictCode] = useState(null)

    //State ward
    const [listWard, setListWard] = useState([])

    const getListProvince = () => {
        fetch('https://provinces.open-api.vn/api/p/')
            .then(res => res.json())
            .then(data => setListProvince(data))
    }
    //Get address
    useEffect(() => {
        getListProvince()
    }, [])

    useEffect(() => {
        const totalPrice = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (convertNewPrice(item.price * item.quantity, item.discount))
            }, 0)
            setTotalPrice(total)
        }
        totalPrice()
    }, [cart])

    const colorList = selector.Products.colorsProduct
    // if (!color) {
    //     return null
    // }



    const handleChangeProvince = (value, option) => {
        form.setFieldsValue({
            district: undefined,
            ward: undefined
        })
        setProvinceCode(option.key)
        setListDistrict([])
        setListWard([])
    }

    const getListDistrict = () => {
        if (!provinceCode || listDistrict.length) {
            return
        }
        fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
            .then(res => res.json())
            .then(data => setListDistrict(data.districts))
    }

    const handleChangeDistrict = (value, option) => {
        form.setFieldsValue({
            ward: undefined
        })
        setDistrictCode(option.key)
        setListWard([])
    }

    const getListWard = () => {
        if (!districtCode || listWard.length) {
            return
        }
        fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
            .then(res => res.json())
            .then(data => setListWard(data.wards))
    }


    const handleSubmitForm = () => {
        if (!currUser) {
            message.error('Vui lòng đăng nhập để đặt hàng!')
        } else {
            form.validateFields().then((values) => finalSubmit(values))
        }
    }

    function sortObject(obj) {
        var sorted = {};
        var str = [];
        var key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    }

    const handlePaymentOnline = () => {
        var ipAddr = '172.168.0.1'
        var tmnCode = 'V1LO03SA'
        var secretKey = 'ABNXIREWAUKEJSCQYFIUSCERNPQAEDRC'
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        var returnUrl = 'http://localhost:3000/checkoutSuccess';

        var date = new Date();
        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = convertPriceWithCoupon(totalPrice, coupon ? +coupon.number : 0);
        // var bankCode = ''
        var orderInfo = 'Thanh toán sản phẩm!';
        var orderType = 'other';
        var locale = 'vn';
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params = sortObject(vnp_Params);
        var signData = querystring.stringify(vnp_Params, { encode: false });

        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        // window.open(vnpUrl, '_blank');
        window.location.href = vnpUrl
    }

    const finalSubmit = (values) => {
        setIsLoading(true)
        const finalCart = cart.map(item => ({
            product_id: item.id,
            product_quantity: item.quantity,
            product_color: item.color

        }))

        const formatOrder = { ...values, address: values.detailAddress + ', ' + values.ward + ', ' + values.district + ', ' + values.province, coupon_code: coupon ? coupon.code : '' }
        delete formatOrder.ward
        delete formatOrder.district
        delete formatOrder.province
        delete formatOrder.detailAddress

        const newOrder = { ...formatOrder, cart: finalCart }
        localStorage.setItem('newOrders', JSON.stringify(newOrder))

        console.log(newOrder)
        if (payment === 2) {
            handlePaymentOnline()
            return
        }
        dispatch(actMakeNewOrder(newOrder)).then(() => {
            setIsLoading(false)
            dispatch(actDeleteCart())

        }).finally(() => {
            setIsLoading(false)
            localStorage.removeItem('newOrders')
            history.push('/orderSuccess')
        })

    }

    const convertColorById = (id) => {
        let colorName
        if (colorList.length) {
            colorList.forEach((item) => {
                if (item.id == id) {
                    colorName = item.name
                }
            })
            return colorName
        }
    }

    const handleChangeCoupon = (e) => {
        setCouponCode(e.target.value)
    }

    const handleCheckCoupon = () => {
        setIsCheckCoupon(true)
        dispatch(actCheckCoupon(couponCode))
            .then((res) => {
                if (!res.ok) {
                    message.error('Mã khuyến mại không tồn tại!')
                    setCoupon(res.coupon)
                } else {
                    message.success('Mã khuyến mại hợp lệ!')
                    console.log(res)
                    setCoupon(res.coupon)
                }
            })
            .finally(() => {
                setIsCheckCoupon(false)
            })
    }
    const currUser = selector.Auth.token


    return (
        <div className="container checkout-page">
            <Breadcrumb
                style={{
                    margin: '2rem 0',
                    backgroundColor: "#fff",
                    display: "inline-block",
                    padding: "1rem 2rem",
                    borderRadius: "3rem"
                }}
            >
                <Breadcrumb.Item href="/">
                    <HomeOutlined style={{ fontSize: '2rem' }} />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/dien-thoai-di-dong">
                    <Typography.Text strong>
                        Thanh toán
                    </Typography.Text>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[32, 16]}>
                <Col span={14}>
                    <Typography.Title level={3}>
                        Thông tin nhận hàng
                    </Typography.Title>
                    {/* <Underline /> */}
                    <Form
                        layout="vertical"
                        className="checkout-form"
                        form={form}
                        initialValues={{
                            note: ''
                        }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<MailOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Họ và tên"
                                    name="name"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Số điên thoại"
                                    name="phone"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<PhoneOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Thanh toán"
                                    name="method"
                                    rules={[{ required: true, message: 'Vui lòng chọn hình thức thanh toán!' }]}
                                >
                                    <Radio.Group size="large">
                                        <Space>
                                            <Radio.Button value={`Tiền mặt`}>
                                                Tiền mặt
                                            </Radio.Button>
                                            <Radio.Button
                                                value={2}
                                                // onClick={handlePaymentOnline}
                                                onClick={() => setPayment(2)}
                                            >
                                                VNPAY
                                            </Radio.Button>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>

                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="province"
                                    label="Tỉnh/Thành phố"
                                    rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/Thành phố!' }]}
                                >
                                    <Select
                                        placeholder="Chọn Tỉnh/Thành phố"
                                        size="large"
                                        onChange={(value, option) => handleChangeProvince(value, option)}
                                    >
                                        {
                                            listProvince.map((item) =>
                                                <Option
                                                    key={item.code}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="district"
                                    label="Quận/Huyện"
                                    rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện!' }]}
                                >
                                    <Select
                                        placeholder="Chọn Quận/Huyện"
                                        size="large"
                                        onFocus={getListDistrict}
                                        onSelect={(value, option) => handleChangeDistrict(value, option)}
                                    >
                                        {
                                            listDistrict.map((item) =>
                                                <Option
                                                    key={item.code}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="ward"
                                    label="Phường/Xã"
                                    rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã!' }]}
                                >
                                    <Select
                                        placeholder="Chọn Phường/Xã"
                                        size="large"
                                        onFocus={getListWard}
                                    >
                                        {
                                            listWard.map((item) =>
                                                <Option
                                                    key={item.code}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="detailAddress"
                                    label="Đường, số nhà"
                                    rules={[{ required: true, message: 'Vui lòng nhập đường, số nhà!' }]}
                                >
                                    <Input
                                        placeholder="Số đường, địa chỉ"
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Ghi chú"
                                    name="note"
                                >
                                    <Input.TextArea
                                        size="large"
                                        showCount
                                        maxLength={100}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col
                    span={10}
                    className="checkout-total"
                >
                    <Row
                        direction="horizontal"
                        align="middle"
                        justify="space-between"
                    >
                        <Typography.Title level={3}>
                            Thông tin đơn hàng
                        </Typography.Title>
                        <Button
                            type="link"
                            danger
                            style={{ fontSize: "1.5rem", fontWeight: "600" }}
                            href="/cart"
                            icon={<EditOutlined />}
                        >
                            Chỉnh sửa
                        </Button>
                    </Row>
                    {/* <Underline /> */}
                    <Row>
                        {
                            cart.map((item, index) => {
                                return (
                                    <Col span={24} key={index}>
                                        <Card
                                            style={{ width: "100%" }}
                                        >
                                            <Meta
                                                avatar={
                                                    <Badge
                                                        count={item.quantity}
                                                        size="small"
                                                    >
                                                        <Avatar
                                                            size="large"
                                                            shape="square"
                                                            src={item.image}
                                                        />
                                                    </Badge>
                                                }

                                                title={`${item.name} (${convertColorById(item.color)})`}
                                                description={<>
                                                    <Typography.Text
                                                        strong
                                                        style={{ fontSize: "1.6rem" }}
                                                        type="danger"
                                                    >

                                                        {formatVND(convertNewPrice(item.price, item.discount))}
                                                    </Typography.Text>
                                                </>
                                                }
                                            />
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                        <Divider />
                        <Col span={24}>
                            <Space size='large'>
                                <Input
                                    size='large'
                                    style={{ width: '34.6rem' }}
                                    placeholder='Mã khuyến mại'
                                    onChange={handleChangeCoupon}
                                    disabled={coupon}
                                    allowClear
                                />
                                {
                                    coupon ?
                                        <Button
                                            size='large'
                                            type='primary'
                                            danger
                                            onClick={() => setCoupon(null)}

                                        >
                                            Huỷ
                                        </Button>
                                        :
                                        <Button
                                            size='large'
                                            type='primary'
                                            onClick={() => handleCheckCoupon()}
                                            disabled={!couponCode}
                                            loading={isCheckCoupon}
                                        >
                                            Áp dụng
                                        </Button>
                                }
                            </Space>
                            {
                                coupon ?
                                    <small style={{ display: 'block' }}>Bạn đang áp dụng mã khuyến mại "{coupon.name}"</small> :
                                    null
                            }
                        </Col>
                        <Divider />
                        <Col span={24}
                            style={{
                                backgroundColor: "#fff",
                                padding: "2rem"
                            }}
                        >
                            <Typography.Title
                                level={3}
                            >
                                Đặt hàng
                            </Typography.Title>
                            {/* <Underline /> */}
                            <Space
                                size="middle"
                                direction="vertical"
                                style={{ width: "100%" }}
                            >
                                <Row
                                    justify="space-between"
                                >
                                    <Col>
                                        <Typography.Text
                                            strong

                                        >
                                            Tạm tính
                                        </Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >
                                            {
                                                formatVND(totalPrice)
                                            }
                                        </Typography.Text>

                                    </Col>
                                </Row>
                                <Row
                                    justify="space-between"
                                >
                                    <Col>
                                        <Typography.Text
                                            strong

                                        >
                                            Khuyến mại
                                        </Typography.Text>
                                    </Col>
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >
                                            {
                                                formatVND(coupon ? +coupon.number : 0)
                                            }
                                        </Typography.Text>

                                    </Col>
                                </Row>
                                <Row
                                    justify="space-between"
                                >
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >
                                            Phí vận chuyển
                                        </Typography.Text>

                                    </Col>
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >
                                            {formatVND(0)}
                                        </Typography.Text>

                                    </Col>
                                </Row>
                                <Row
                                    justify="space-between"
                                >
                                    <Col>
                                        <Typography.Text
                                            strong
                                        >
                                            Tổng cộng
                                        </Typography.Text>

                                    </Col>
                                    <Col>
                                        <Typography.Text
                                            strong
                                            type="danger"
                                            style={{ fontSize: "2rem" }}
                                        >
                                            {
                                                formatVND(convertPriceWithCoupon(totalPrice, coupon ? +coupon.number : 0))
                                            }
                                        </Typography.Text>

                                    </Col>
                                </Row>
                                <Button
                                    size="large"
                                    type="primary"
                                    danger
                                    style={{ width: "100%" }}
                                    onClick={handleSubmitForm}
                                    loading={isLoading}
                                >
                                    Đặt hàng ngay
                                </Button>
                                <Row
                                    justify="center"
                                >
                                    <Typography.Text
                                        strong
                                        type="danger"
                                    >
                                        Vui lòng kiểm tra kỹ lại đơn hàng trước khi đặt mua!
                                    </Typography.Text>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}


export default Checkout

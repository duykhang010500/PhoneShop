// import React, { useEffect, useState } from 'react'
// import {
//     Empty,
//     Button,
//     Space,
//     Typography,
//     Row,
//     Divider,
//     Avatar,
//     Col
// } from 'antd'

// import {
//     ShoppingCartOutlined,
//     DeleteOutlined
// } from '@ant-design/icons'

// import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'


// import {
//     formatVND
// } from '../../helpers/priceFormat'
// import { actDeleteItem } from '../../store/cart/action'

// const Cart = () => {

//     const dispatch = useDispatch()
//     const cart = useSelector(state => state.Cart.cart)

//     const [total, setTotal] = useState(0)

//     function handleDelete(id) {
//         console.log('Delete ', id)
//     }

//     useEffect(() => {
//         const getTotal = () => {
//             const total = cart.reduce((prev, item) => {
//                 return prev + (item.price * item.quantity)
//             }, 0)
//             setTotal(total)
//         }
//         getTotal()
//     }, [cart])

//     return (
//         <div className="cart">
//             <div className="cart-info">
//                 {
//                     (cart.length != 0) ? cart.map((item, index) => {
//                         return (
//                             <Row
//                                 key={index}
//                                 justify="space-between"
//                                 align="top"
//                                 style={{ marginBottom: "1rem" }}
//                             >
//                                 <Col span={8}>
//                                     <Link to={`/product/${item.id}`}>
//                                         <Avatar
//                                             size="large"
//                                             shape="square"
//                                             src={item.image}
//                                         />
//                                     </Link>
//                                 </Col>
//                                 <Col span={14}>
//                                     <Link to={`/product/${item.id}`}>
//                                         <Space direction="vertical">
//                                             <Typography.Text
//                                                 strong
//                                                 style={{ fontSize: '1.3rem' }}
//                                             >
//                                                 {item.name}
//                                             </Typography.Text>
//                                             <Typography.Text
//                                                 strong
//                                                 style={{ fontSize: '1.3rem' }}
//                                                 type="danger"
//                                             >
//                                                 {item.price} đ
//                                             </Typography.Text>
//                                         </Space>
//                                     </Link>
//                                 </Col>
//                                 <Col span={2}>
//                                     <DeleteOutlined
//                                         style={{ color: "red", cursor: "pointer" }}
//                                         onClick={() => dispatch(actDeleteItem(item.id))}
//                                     />
//                                 </Col>
//                             </Row>
//                         )
//                     }) :
//                         <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />

//                 }
//             </div>
//             <Divider />
//             <Row
//                 justify="center"
//             >
//                 {/* <Row
//                     justify="space-between"
//                 >
//                     <Typography.Text
//                         strong
//                     >
//                         Tổng tiền:
//                     </Typography.Text>
//                     <Typography.Text
//                         strong
//                         type="danger"
//                         style={{ fontSize: "1.6rem" }}

//                     >
//                         {

//                             formatVND(total)
//                         }
//                     </Typography.Text>
//                 </Row> */}
//                 <Button
//                     type="primary"
//                     danger
//                     icon={<ShoppingCartOutlined />}
//                     size="large"
//                     href="/cart"
//                 >

//                     Xem giỏ hàng

//                 </Button>

//             </Row>
//         </div>

//     )
// }

// export default Cart

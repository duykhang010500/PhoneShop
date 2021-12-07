import orderServices from "../../services/orderServices"

export const ACT_GET_MY_ORDERS = 'ACT_GET_MY_ORDERS'
export const ACT_GET_DETAIL_ORDERS = ' ACT_GET_DETAIL_ORDERS'
export const ACT_GET_LIST_ORDERS_USER = 'ACT_GET_LIST_ORDERS_USER'

// create new order
export const actMakeNewOrder = (formData) => async (dispatch) => {
    try {
        const res = await orderServices.makeNewOrder(formData)
        console.log(res)
    } catch (err) {
        throw err
    }
}

// get my order (user)
export const actGetMyOrders = (myOrders) => {
    return {
        type: ACT_GET_MY_ORDERS,
        payload: { myOrders }
    }
}

export const actGetMyOrdersAsync = () => async (dispatch) => {
    const res = await orderServices.getListOrder()
    const myOrders = res.data.data
    dispatch(actGetMyOrders(myOrders))
}

//Get detail my orders
export const actGetDetailOrders = (orders) => {
    return {
        type: ACT_GET_DETAIL_ORDERS,
        payload: { orders }
    }
}

export const actGetDetailOrdersAsync = (orderCode) => async (dispatch) => {
    try {
        const res = await orderServices.getDetailOrder(orderCode)
        console.log(res)
        const orders = res.data.data
        dispatch(actGetDetailOrders(orders))
    } catch (err) {
        throw err
    }
}

//Get list orders user (admin)
export const actGetListOrdersUser = (listOrdersUser) => {
    return {
        type: ACT_GET_LIST_ORDERS_USER,
        payload: { listOrdersUser }
    }
}

export const actGetListOrdersUserAsync = () => async (dispatch) => {
    try {
        const res = await orderServices.getListOrderUser()
        const listOrdersUser = res.data.data
        dispatch(actGetListOrdersUser(listOrdersUser))
    } catch (err) {
        throw err
    }
}

//Get detail orders user (admin)

export const actGetDetailOrderUserAsync = (order_code) => async (dispatch) => {
    try {
        const res = await orderServices.getDetailOrderUser(order_code)
        console.log('Order user: ', res)
        const orders = res.data.data
        dispatch(actGetDetailOrders(orders))
    } catch (err) {
        throw err
    }
}

//Update status orders
export const actUpdateStatusOrder = (order_code, status) => async (dispatch) => {
    try {
        const res = await orderServices.updateStatusOrders(order_code, status)
        console.log(res)
    } catch (err) {
        throw err
    }
}


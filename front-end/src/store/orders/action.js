import orderServices from "../../services/orderServices"

export const ACT_GET_MY_ORDERS = 'ACT_GET_MY_ORDERS'
export const ACT_GET_DETAIL_ORDERS = ' ACT_GET_DETAIL_ORDERS'

export const actMakeNewOrder = (formData) => async (dispatch) => {
    const res = await orderServices.makeNewOrder(formData)
    console.log(res)
}

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

export const actGetDetailOrders = (orders) => {
    return {
        type: ACT_GET_DETAIL_ORDERS,
        payload: { orders }
    }
}

export const actGetDetailOrdersAsync = (orderCode) => async (dispatch) => {
    const res = await orderServices.getDetailOrder(orderCode)
    // console.log(res)
    const orders = res.data.data
    dispatch(actGetDetailOrders(orders))
}
import orderServices from "../../services/orderServices"

export const ACT_GET_MY_ORDERS = 'ACT_GET_MY_ORDERS'

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
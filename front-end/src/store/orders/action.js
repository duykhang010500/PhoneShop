import orderServices from "../../services/orderServices"

export const actMakeNewOrder = (formData) => async (dispatch) => {
    const res = await orderServices.makeNewOrder(formData)
    console.log(res)
}
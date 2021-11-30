import customerServices from "../../services/customerServices"

export const ACT_GET_LIST_CUSTOMER = 'ACT_GET_LIST_CUSTOMER'

//Get List Customer
export const actGetListCustomer = (list) => {
    return {
        type: ACT_GET_LIST_CUSTOMER,
        payload: { list }
    }
}

export const actGetListCustomerAsync = () => async (dispatch) => {
    try {
        const res = await customerServices.getList()
        const listCustomer = res.data.data
        dispatch(actGetListCustomer(listCustomer))
    } catch (err) {
        throw err
    }
}
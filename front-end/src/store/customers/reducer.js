import { ACT_GET_LIST_CUSTOMER } from "./action"

const initialState = {
    list: []
}

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_LIST_CUSTOMER:
            return {
                ...state,
                list: action.payload.list
            }
        default:
            return state
    }
}

export default customersReducer
import { ACT_GET_LIST_BRAND_ADMIN, ACT_SET_LIST_BRAND } from "./actions"

const initState = {}

const brandsReducer = (state = initState, action) => {
    switch (action.type) {
        case ACT_SET_LIST_BRAND:
            return action.payload
        // case ACT_GET_LIST_BRAND_ADMIN:
        //     return 
        default:
            return state
    }
}

export default brandsReducer
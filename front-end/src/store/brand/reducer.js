import { ACT_SET_LIST_BRAND } from "./action"

const initState = {}

const brandsReducer = (state = initState, action) => {
    switch (action.type) {
        case ACT_SET_LIST_BRAND:
            return action.payload
        default:
            return state
    }
}

export default brandsReducer
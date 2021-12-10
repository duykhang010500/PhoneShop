import { ACT_GET_DASHBOARD } from "./action"

const initialState = null

const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_DASHBOARD:
            return action.payload.list

        default:
            return state
    }
}

export default statisticsReducer
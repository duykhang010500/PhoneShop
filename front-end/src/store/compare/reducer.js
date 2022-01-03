import { FlowAnalysisGraph } from "@ant-design/charts"
import { openNotificationWithIcon } from "../../helpers/notification"
import { ACT_ADD_TO_COMPARE, ACT_REMOVE_ALL_COMPARE, ACT_REMOVE_COMPARE, ACT_SHOW_COMPARE } from "./action"

const getCompareList = () => {
    const list = localStorage.getItem('compareList')
    if (list) {
        const list = localStorage.getItem('compareList')
        return JSON.parse(list)
    } else {
        return []
    }
}

const initialState = {
    compareList: getCompareList(),
    isShowCompareMenu: false
}

const compareReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_ADD_TO_COMPARE:
            if (state.compareList.length === 3) {
                openNotificationWithIcon('error', 'Chỉ có thể so sánh tối đa 3 sản phẩm!')
            } else {
                let newCompareList = [...state.compareList, action.payload.product]
                localStorage.setItem('compareList', JSON.stringify(newCompareList))
                return {
                    ...state,
                    compareList: [...state.compareList, action.payload.product],
                    isShowCompareMenu: true
                }
            }
        case ACT_REMOVE_COMPARE: {
            let newCompareList = state.compareList.filter((item) => item.id != action.payload.id)
            localStorage.setItem('compareList', JSON.stringify(newCompareList))
            return {
                ...state,
                compareList: newCompareList,
                isShowCompareMenu: newCompareList.length ? true : false
            }
        }
        case ACT_REMOVE_ALL_COMPARE: {
            let newCompareList = []
            localStorage.setItem('compareList', JSON.stringify(newCompareList))
            return {
                ...state,
                compareList: newCompareList,
                isShowCompareMenu: false
            }
        }
        case ACT_SHOW_COMPARE: {
            return {
                ...state,
                isShowCompareMenu: !state.isShowCompareMenu
            }
        }
        default:
            return state
    }
}

export default compareReducer
import statisticsService from "../../services/statisticsServices"

// Action types
export const ACT_GET_DASHBOARD = 'ACT_GET_DASHBOARD'

// Lấy thông tin thống kê
export const actGetDashboard = (list) => {
    return {
        type: ACT_GET_DASHBOARD,
        payload: { list }
    }
}

export const actGetDashboardAsync = () => async (dispatch) => {
    try {
        const res = await statisticsService.getDashboard()
        console.log(res)
        dispatch(actGetDashboard(res.data))
    } catch (err) {
        throw err
    }
}
import api from "./api"
const statisticsService = {
    getDashboard: () => {
        return api.callWithToken().get('/admin/dashboard?dashboard_value=thangnay')
    }
}
export default statisticsService
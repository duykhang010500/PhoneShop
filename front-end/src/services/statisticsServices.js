import api from "./api"
const statisticsService = {
    getDashboard: () => {
        return api.call().get('/admin/dashboard?dashboard_value=thangnay')
    }
}
export default statisticsService

import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import { useAuthenticated } from '../../hooks/useAuthenticate'
import DashboardUserChangePassword from './DashboardUserChangePassword'
import DashboardUserInfo from './DashboardUserInfo'
import DashboardUserOrders from './DashboardUserOrders'

const DashboardUserRoutes = () => {
    return (
        <Switch>
            <Route path='/user' component={DashboardUserInfo} exact />
            <Route path='/user/orders' component={DashboardUserOrders} exact />
            <Route path='/user/password' component={DashboardUserChangePassword} exact />
        </Switch>
    )
}

export default DashboardUserRoutes

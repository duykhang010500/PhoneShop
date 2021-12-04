
import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'

import DashboardUserChangePassword from './DashboardUserChangePassword'
import DashboardUserInfo from './DashboardUserInfo'
import DashboardUserOrders from './DashboardUserOrders'
import DashboardUserWishList from './DashboardUserWishList'

const DashboardUserRoutes = () => {
    return (
        <Switch>
            <Route path='/user' component={DashboardUserInfo} exact />
            <Route path='/user/orders' component={DashboardUserOrders} exact />
            <Route path='/user/password' component={DashboardUserChangePassword} exact />
            <Route path='/user/wishlist' component={DashboardUserWishList} exact />
        </Switch>
    )
}

export default DashboardUserRoutes

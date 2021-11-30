import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import DashboardAdminCategories from './DashboardAdminCategories'
import DashboardAdminCustomers from './DashboardAdminCustomers'
import DashboardHome from './DashboardAdminHome'
import DashboardAdminOrders from './DashboardAdminOrders'
import DashboardAminProducts from './DashboardAminProducts'

const DashboardAdminRoutes = () => {
    return (
        <Switch>
            <Route exact path='/admin' component={DashboardHome} />
            <Route exact path='/admin/orders' component={DashboardAdminOrders} />
            <Route exact path='/admin/categories' component={DashboardAdminCategories} />
            <Route exact path='/admin/products' component={DashboardAminProducts} />
            <Route exact path='/admin/customer' component={DashboardAdminCustomers} />
        </Switch>
    )
}

export default DashboardAdminRoutes

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
import DashboardAdminCreateProduct from './DashboardAdminCreateProduct'
import DashboardAdminUpdateProduct from './DashboardAdminUpdateProduct'
import DashboardAdminArticleCategory from './DashboardAdminArticleCategory'
import DashboardAdminArticlesPost from './DashboardAdminArticlesPost'
import DashboardAdminCoupon from './DashboardAdminCoupon'

const DashboardAdminRoutes = () => {
    return (
        <Switch>
            <Route exact path='/admin' component={DashboardHome} />
            <Route exact path='/admin/orders' component={DashboardAdminOrders} />
            <Route exact path='/admin/categories' component={DashboardAdminCategories} />
            <Route exact path='/admin/products' component={DashboardAminProducts} />
            <Route exact path='/admin/customer' component={DashboardAdminCustomers} />
            <Route exact path='/admin/products/create' component={DashboardAdminCreateProduct} />
            <Route exact path='/admin/products/update/:slug' component={DashboardAdminUpdateProduct} />
            <Route exact path='/admin/news/category' component={DashboardAdminArticleCategory} />
            <Route exact path='/admin/news/posts' component={DashboardAdminArticlesPost} />
            <Route exact path='/admin/coupons' component={DashboardAdminCoupon} />
        </Switch>
    )
}

export default DashboardAdminRoutes

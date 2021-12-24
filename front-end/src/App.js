import React, { useEffect } from "react"

import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"

import { useDispatch } from 'react-redux'

import { BackTop } from 'antd'
import { UpCircleTwoTone } from '@ant-design/icons'
import CoreValue from "./components/CoreValue"
import Footer from "./components/common/Footer"
import Header from './components/common/Header'
import HomePage from "./pages/Home"
import Login from "./pages/Login"
import DetailProduct from "./pages/DetailProduct"
import PageNotFound from "./pages/PageNotFound"
import Register from "./pages/Register"

import Cart from './pages/Cart'
import Checkout from "./pages/Checkout"
import AdminLogin from './pages/AdminLogin'
import DashboardUser from "./pages/DashboardUser"
import DashboardAdmin from "./pages/DashboardAdmin"
import OrderSuccess from "./pages/OrderSuccess"

import { actFetchMe, actGetAdmin } from "./store/auth/action"
import { actGetListBrandAsync } from "./store/brands/actions"
import { actGetColorsProductAsync } from "./store/products/actions"
import Search from "./pages/Search"
import FilterProducts from "./pages/FilterProducts"
import News from "./pages/News"
import DetailPostNews from "./pages/DetailPostNews"
import CheckoutSuccess from "./pages/CheckoutSuccess"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import OrderTracking from "./pages/OrderTracking"

function App() {

  const dispatch = useDispatch()
  const isDashBoardAdmin = useRouteMatch('/admin')
  useEffect(() => {
    if (+localStorage.getItem('r') === 1) {
      dispatch(actFetchMe())
    } else {
      dispatch(actGetAdmin())
    }
    dispatch(actGetListBrandAsync())
    dispatch(actGetColorsProductAsync())
  }, [dispatch])

  return (
    <div>
      {
        !isDashBoardAdmin && <Header />
      }
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path='/login/admin' exact>
          <AdminLogin />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/news">
          <News />
        </Route>
        <Route exact path="/news/post/:slug">
          <DetailPostNews />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/orderSuccess">
          <OrderSuccess />
        </Route>
        <Route exact path="/product/:id">
          <DetailProduct />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path='/products'>
          <FilterProducts />
        </Route>
        <Route exact path='/checkoutSuccess'>
          <CheckoutSuccess />
        </Route>
        <Route exact path='/forgot-password'>
          <ForgotPassword />
        </Route>
        <Route exact path='/new-password'>
          <NewPassword />
        </Route>
        <Route exact path='/order-tracking'>
          <OrderTracking />
        </Route>
        <Route path="/user">
          <DashboardUser />
        </Route>
        <Route path="/admin">
          <DashboardAdmin />
        </Route>
        <Route path="/*">
          <PageNotFound />
        </Route>
      </Switch>
      {
        !isDashBoardAdmin && (
          <>
            <CoreValue />
            <Footer />
            <BackTop>
              <UpCircleTwoTone style={{ fontSize: "3.5rem", color: 'red' }} />
            </BackTop>
          </>
        )
      }
    </div>
  );
}

export default App;

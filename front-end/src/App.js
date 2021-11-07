import React, {
  useEffect
} from "react"
import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom"

import {
  useDispatch,
  useSelector
} from 'react-redux'

import './scss/index.scss'
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
import ProductByCategory from "./pages/ProductByCategory"
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout"
import AdminLogin from './pages/AdminLogin'
import DashboardUser from "./pages/DashboardUser"
import DashboardAdmin from "./pages/DashboardAdmin"
import { actFetchMe, actGetAdmin } from "./store/auth/action"
import { actGetListBrandAsync } from "./store/brand/action"

function App() {

  const isDashBoardAdmin = useRouteMatch('/admin')
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('r') == 1) {
      dispatch(actFetchMe())
    } else {
      dispatch(actGetAdmin())
    }
    dispatch(actGetListBrandAsync())
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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/dien-thoai-di-dong">
          <ProductByCategory />
        </Route>
        <Route exact path="/product/:id">
          <DetailProduct />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route path="/user">
          <DashboardUser />
        </Route>
        <Route path="/admin">
          <DashboardAdmin />
        </Route>
        <Route path='/login/admin' exact>
          <AdminLogin />
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
          </>
        )
      }
      <BackTop>
        <UpCircleTwoTone style={{ fontSize: "3.5rem" }} />
      </BackTop>
    </div>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { BackTop } from 'antd';
import { UpCircleTwoTone } from '@ant-design/icons'
import CoreValue from "./components/CoreValue";
import Footer from "./components/Footer";
import Header from './components/Header';
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import './scss/index.scss'

function App() {
  return (
    <Router>
      <Header />
      
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
            </Route>
          </Switch>
          <CoreValue />
        
        <Footer />
        <BackTop>
          <UpCircleTwoTone style={{fontSize:"3.5rem"}}/>
        </BackTop>
    </Router>
  );
}

export default App;

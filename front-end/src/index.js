import React from 'react';
import ReactDOM from 'react-dom';
import './configs/less/app.less'
import './scss/index.scss'
import 'quill/dist/quill.snow.css';
import './configs/messageConfig'
import App from './App';
import {
  BrowserRouter
} from 'react-router-dom'
import {
  Provider
} from 'react-redux'
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);



import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

//redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

//ie11
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

const store = createStore(rootReducer, composeWithDevTools());

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(
    <Root />, 
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

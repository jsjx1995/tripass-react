import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as ReduxProvider } from 'react-redux';
import { defaultTheme, Provider as AdobeProvider } from '@adobe/react-spectrum';
import store from './store';

ReactDOM.render(
  // <React.StrictMode>
  <AdobeProvider colorScheme="light" theme={defaultTheme}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </AdobeProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

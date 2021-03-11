import React from 'react';
import ReactDOM from 'react-dom';
import App from './bin/App';
import './style.sass';

fetch('https://8000-aquamarine-manatee-53yzfxbx.ws-eu03.gitpod.io/fibonacci/15').then(res => res.text()).then(r => console.log(`Received ${r}`));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}

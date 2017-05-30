/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './static/css/index.css';
import './static/css/bootstrap.css';
import mirage from './static/themes/mirage';

import App from './components/app';
import storage from './utils/storage';
import serviceWorker from './utils/service-worker';
import configureStore from './stores/configure-store';

const store = configureStore({
  theme: storage.getItem('theme')
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.register();

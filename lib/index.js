/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import Root from './containers/root';
import serviceWorker from './utils/service-worker';
import configureStore from './stores/configure-store';
import { loadConfiguration } from './actions/configuration';

// configures the store using the loaded state
const store = configureStore();

// load initial configuration
store.dispatch(loadConfiguration());

// renders the application
ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// register the service worker that will save the current application
serviceWorker.register();

/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import './lib/css/index.css';
import App from './lib/components/App';
import serviceWorker from './lib/utils/service-worker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();

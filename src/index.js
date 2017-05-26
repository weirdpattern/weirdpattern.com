/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import './lib/css/index.css';
import App from './lib/components/App';
import serviceWorker from './lib/utils/service-worker';

import mirage from './lib/themes/mirage'

ReactDOM.render(<ThemeProvider theme={mirage}><App /></ThemeProvider>, document.getElementById('root'));
serviceWorker.register();

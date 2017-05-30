/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import reducers from '../reducers';

// adds middleware
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

/**
 * Creates the store to be used.
 * @param {*} initialState the initial state of the application.
 */
export default (initialState) => {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
  );
};

/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { combineReducers } from 'redux';
import { theme, themes } from './theme';

/**
 * Combines the reducers.
 */
export default combineReducers({
  theme,
  themes
});

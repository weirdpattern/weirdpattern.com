/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CHANGE_THEME } from '../constants/theme';

/**
 * Signals a change of theme.
 * This method validates the theme exists.
 * @param   {string}   theme the theme to be used.
 * @returns {Function}       a new thunk to be handled by the middleware.
 *
 * @public
 * @function
 * @module actions
 */
export const changeTheme = theme => (dispatch, getState) => {
  if (Object.prototype.hasOwnProperty(getState().themes, theme)) {
    dispatch({
      type: CHANGE_THEME,
      theme
    });
  }
};

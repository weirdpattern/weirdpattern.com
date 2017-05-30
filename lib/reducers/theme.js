/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CONFIGURATION_LOADED } from '../constants/configuration';

/**
 * The current theme of the application.
 * @param   {string} state  the current theme.
 * @param   {Object} action the action to be executed.
 * @returns {string}        the new state handled by the reducer.
 */
export const theme = (state = '', action) => {
  switch(action.type) {
    case CONFIGURATION_LOADED: {
      return action.configuration.theme;
    }

    default: {
      return state;
    }
  }
};

/**
 * The available themes of the application.
 * @param   {Object} state  the available themes.
 * @param   {Object} action the action to be executed.
 * @returns {Object}        the new state handled by the reducer.
 */
export const themes = (state = {}, action) => {
  switch(action.type) {
    case CONFIGURATION_LOADED: {
      return {
        ...state,
        ...action.configuration.themes
      };
    }

    default: {
      return state;
    }
  }
};

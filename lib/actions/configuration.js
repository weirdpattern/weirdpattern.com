/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import themes from '../static/themes';
import storage from '../utils/storage';
import defaults from '../constants/defaults';

import { CONFIGURATION_LOADED } from '../constants/configuration';

/**
 * Signals a load of configuration
 * @returns {Object} the action to be executed.
 *
 * @public
 * @function
 * @module actions
 */
export const loadConfiguration = () => {
  return {
    type: CONFIGURATION_LOADED,
    configuration: {
      ...defaults,
      themes,
      ...storage.get('weirdpattern-storage-state')
    }
  };
};

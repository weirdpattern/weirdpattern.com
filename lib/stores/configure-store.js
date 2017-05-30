/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configure-store-prod');
} else {
  module.exports = require('./configure-store-dev');
}

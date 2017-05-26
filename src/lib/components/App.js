/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';

import '../css/App.css';
import logo from '../media/logo.svg';
import { Realm } from '../styles/layout';

class App extends Component {
  render() {
    return (
      <Realm fluid>
        <img src={logo} alt="WeirdPattern" style={{height: "40px"}} />
      </Realm>
    );
  }
}

export default App;

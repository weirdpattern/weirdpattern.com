/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import '../static/css/app.css';
import logo from '../static/media/logo.svg';
import mirage from '../static/themes/mirage';

const App = ({ theme }) => {
  <ThemeProvider theme={theme || mirage}>
    <div className="app">
      <div className="app-header">
        <img src={logo} alt="WeirdPattern" style={{height: "40px"}} />
      </div>
    </div>
  </ThemeProvider>
};

App.propTypes = {
  theme: PropTypes.object
}

const mapStateToProps = (state) => ({
  theme:
});

export default App;

/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import { ThemeProvider } from 'styled-components';

import Header from '../components/header';

// define the App component
const App = ({ theme }) => (
  <ThemeProvider theme={theme.data}>
    <Grid>
      <Header />
    </Grid>
  </ThemeProvider>
);

// add the prop types
App.propTypes = {
  theme: PropTypes.object
};

// mapping state to props
const mapStateToProps = (state) => ({
  theme: state.themes[state.theme]
});

// connect
export default connect(
  mapStateToProps
)(App);

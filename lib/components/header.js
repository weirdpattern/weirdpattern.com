/**
 * Copyright (c) 2017, WeirdPattern
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styled from 'styled-components';
import logo from '../static/media/logo.svg';

// define the HeaderContainer component
const HeaderContainer = styled.div`
  height: 50px;
  padding: 20px;
  color: ${props => props.theme.header.foreground};
  background-color: ${props => props.theme.header.background};
`;

// define the Header component
const Header = () => (
  <HeaderContainer>
    <img src={logo} alt="WeirdPattern" style={{ height: "40px" }} />
  </HeaderContainer>
);

export default Header;

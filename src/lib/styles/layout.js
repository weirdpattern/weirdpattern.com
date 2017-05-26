import styled from 'styled-components';
import { Page, Column, Row } from 'hedron';

const Realm = styled(Page)`
  background: ${props => props.theme.header.backgroundColor};
`;

Realm.defaultProps = {
  theme: {
    header: {
      backgroundColor: '#000'
    }
  }
}

export { Realm };

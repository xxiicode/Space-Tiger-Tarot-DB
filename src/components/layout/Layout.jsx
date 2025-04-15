import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';
import { theme } from '../../theme/theme';

const Main = styled.main`
  min-height: calc(100vh - 120px);
  padding: ${theme.spacing.xl} 0;
`;

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}; 
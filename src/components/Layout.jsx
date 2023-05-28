import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Container
        maxWidth="lg"
        sx={{ marginTop: '20px', height: 'calc(100vh - 10rem)' }}
      >
        {children}
      </Container>
    </div>
  );
};

export default Layout;

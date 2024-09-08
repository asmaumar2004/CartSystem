import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" gutterBottom>
            Product Catalog
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <ProductList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Shopping Cart
          </Typography>
          <Cart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
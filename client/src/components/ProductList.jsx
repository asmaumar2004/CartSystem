import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={product.imageUrl}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="h6">${product.price}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => addToCart(product._id, 1)}
                style={{ marginTop: '10px' }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
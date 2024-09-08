import React from 'react';
import { Button, Card, CardContent, Typography, Grid, TextField, CardMedia } from '@mui/material';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useCart();

  const handleUpdateQuantity = (itemId, quantity) => {
    updateCart(itemId, quantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Grid container spacing={2}>
      {cart.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.productId}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={item.imageUrl}
              alt={item.name}
            />
            <CardContent>
              <Typography variant="h5">{item.name}</Typography>
              <Typography variant="h6">${item.price}</Typography>
              <Typography variant="body2">Quantity: 
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.productId, parseInt(e.target.value))}
                  style={{ marginLeft: '10px', width: '50px' }}
                />
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleRemoveItem(item.productId)}
                style={{ marginTop: '10px' }}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h6">Total: ${calculateTotal()}</Typography>
      </Grid>
    </Grid>
  );
};

export default Cart;
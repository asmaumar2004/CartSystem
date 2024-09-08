# Cart System

## Introduction

The Cart Management System is a web application created using the MERN stack (MongoDB, Express.js, React, and Node.js). It provides users with a streamlined way to manage their shopping carts, offering functionality to add, update, and remove products. The backend handles API requests and interacts with the database, while the frontend offers a responsive and intuitive interface for user interactions.

## Setup

### Backend Setup

1. *Clone the Repository:*
   bash
   git clone https://github.com/yourusername/CartManagementSystem.git
   cd CartManagementSystem
   

2. *Install Dependencies:*
   bash
   npm install
   

3. *Configure Environment Variables:*
   - Create a .env file in the root directory with necessary variables.

4. *Start the Backend Server:*
   bash
   npm start
   

### Frontend Setup

1. *Navigate to Client Directory:*
   bash
   cd client
   

2. *Install Frontend Dependencies:*
   bash
   npm install
   

3. *Configure Environment Variables:*
   - Create a .env file in the client directory with necessary variables.

4. *Start the Frontend Development Server:*
   bash
   npm run dev
   

## Endpoints

### Product Endpoints

- *GET /api/products*
  - *Description:* Fetches all products available in the database.
  - *Response:* Array of product objects.

### Cart Endpoints

- *POST /api/cart*
  - *Description:* Adds or updates a product in the user's cart.
  - *Request Body:*
    json
    {
      "userId": "exampleUserId",
      "productId": "exampleProductId",
      "quantity": 1
    }
    
  - *Response:* Updated cart object.

- *PUT /api/cart/:id*
  - *Description:* Updates the quantity of a product in the cart.
  - *Request Body:*
    json
    {
      "quantity": 2
    }
    
  - *Response:* Updated cart object.

- *DELETE /api/cart/:id*
  - *Description:* Removes a product from the cart.
  - *Request Body:*
    json
    {
      "productId": "exampleProductId"
    }
    
  - *Response:* Updated cart object.

- *GET /api/cart*
  - *Description:* Fetches the current state of the user's cart.
  - *Query Parameters:*
    - userId: ID of the user.
  - *Response:* Cart object including total price.

---

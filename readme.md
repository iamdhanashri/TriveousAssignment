# Triveous Assignment

The assignment I completed is the "BACKEND ASSIGNMENT: 'Ecommerce API with Node.js'" and used MongoDB as Database. 




## Getting Started

Explain how to set up and run your project locally. Include steps for installing dependencies, configuring environment variables, and starting the development server.

### Installation

```bash
npm install
```
### Start Project

```bash
npm run dummy-data
```
```bash
num start
```


## API Documentation

### User Endpoints

#### Create User

```http
POST /user/register
```

Create a new user.


#### User Login

```http
POST /user/login
```

User login.


### Cart Endpoints

#### Get User's Cart

```http
GET /cart/
```

Get all items in the user's cart.


#### Add Item to Cart

```http
POST /cart/add
```

Add a product to the user's cart.


#### Delete Item from Cart

```http
DELETE /cart/remove/${ProductID}
```

Delete a product from the user's cart.


#### Update Item in Cart

```http
PUT /cart/update/${ProductID}
```

Update the quantity of a product in the user's cart.


### Category Endpoints

#### Post All Categories

```http
POST /api/category/listing
```

Get a list of all product categories.

### Product Endpoints

#### Get All Products

```http
GET /product/
```

Get a list of all products.

#### Get Product by ID

```http
GET /product/${id}
```

Get product details by its ID.



#### Add Product

```http
POST /product/
```

Add a new product.






#### Delete Product by ID

```http
DELETE /product/delete/${id}
```

Delete a product by its ID.



#### Add Order

```http
POST /order/
```

Add an order to the user's order history.


#### Get Order History

```http
GET /order/history
```

Get the user's order history.



#### Get Order by ID

```http
GET /cart/${id}
```

Get order details by its ID.

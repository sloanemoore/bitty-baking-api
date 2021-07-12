# Bitty Baking API Documentation

## About the Bitty Baking API

The Bitty Baking API uses Node, Express, and MySQL to query a database of menu items and orders on your computer.

## Prerequisites

### Node.js

If you do not already have Node installed, you can download it here: https://nodejs.org/en/download/

### MySQL

You will need MySQL to run the Bitty Baking API. If you do not already have it installed on your computer, you can download it here: https://www.mysql.com/downloads/

## Bitty Baking API Quick-start Guide

1. Clone the Bitty Baking API repo.

2. In the root folder, run `npm install`.

3. In the db.js file, replace the environment variable with your MySQL password.

4. Run the MySQL commands in the database.sql file to create the MySQL database.

5. Run the command `npm start` to start your server.

- In your browser, navigate to http://localhost:5000/ You should see the greeting: “Welcome to the Bitty Baking API!”

- In your terminal in your code editor, you should see the message: “Bitty Baking API: Server is running on port 5000!”

- If you see both of these messages, you’re all set!

## Bitty Baking API Endpoints

### Check API Status

GET `/status`\
Returns the status of the Bitty Baking API.

### Get all menu items

GET `/menu`\
Returns all menu items.

Optional query parameter:

- itemType: cookie or cupcake

### Get a single menu item

GET `/menu/:itemId`\
Returns a single menu item.

Required path variable:

- itemId

### Create an order

POST `/orders`\
Creates an order.

Required request body must contain the properties below and be formatted in JSON:

- customerName
- itemId

Example:

```
{
    "customerName": "Jane",
    "itemId": "2"
}
```

### Get an order

GET `/orders/:orderId`\
Returns a single order.

Required path variable:

- orderId

### Get all orders

GET `/orders`\
Returns a list of all orders.

### Update an order

PATCH `/orders`\
Updates an existing order.

Required path variable:

- orderId

Request body:
The body must be formatted in JSON and contain a customerName or itemId. Both parameters may be included, but the body cannot be empty.

- customerName
- itemId

### Delete an order

DELETE `/orders/:orderId`\
Deletes an order.

Required path variable:

- orderId

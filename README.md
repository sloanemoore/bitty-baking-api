# Bitty Baking API Documentation

## About the Bitty Baking API

The Bitty Baking API uses Node, Express, and MySQL to query a database of menu items and orders on your computer.

## Testing with Postman

Here is a video of the Postman tests that were run on the Bitty Baking API.

<a href="https://www.youtube.com/watch?v=Gc6dr-wa6Uc">![Bitty Baking API - Testing with Postman](images/Bitty-Baking-API-Postman-Testing-Cover.png "Bitty Baking API - Testing with Postman")</a>

## Prerequisites

### Node.js

If you do not already have Node installed, you can download it here: https://nodejs.org/en/download/

### MySQL

You will need MySQL to run the Bitty Baking API. If you do not already have it installed on your computer, you can download it here: https://www.mysql.com/downloads/

## Quick-Start Guide

1. Clone the Bitty Baking API repo.

2. In the root folder, run `npm install`.

3. Run the MySQL commands in the database.sql file to create the MySQL database.

4. Run the command `MYSQL_PASSWORD="YOUR MYSQL PASSWORD" npm start` to start your server.

- In your browser, navigate to http://localhost:5000/ You should see the greeting: “Welcome to the Bitty Baking API!”

- In your terminal in your code editor, you should see the message: “Bitty Baking API: Server is running on port 5000!”

- If you see both of these messages, you’re all set!

## Bitty Baking API Endpoints

### Check API Status

GET `/status`\
Returns the status of the Bitty Baking API.

Example of API response:

```
{
    "status": 200
}
```

### Get all menu items

GET `/menu`\
Returns all menu items.

Optional query parameter:

- itemType: cookie or cupcake

Example of API response:

```
[
    {
        "itemId": 1,
        "itemName": "chocolate chip cookie",
        "itemType": "cookie"
    },
    {
        "itemId": 2,
        "itemName": "sugar cookie",
        "itemType": "cookie"
    },
    {
        "itemId": 3,
        "itemName": "lemon cookie",
        "itemType": "cookie"
    },
    {
        "itemId": 4,
        "itemName": "chocolate cupcake",
        "itemType": "cupcake"
    },
    {
        "itemId": 5,
        "itemName": "vanilla cupcake",
        "itemType": "cupcake"
    }
]
```

### Get a single menu item

GET `/menu/:itemId`\
Returns a single menu item.

Required path variable:

- itemId

Example of API response:

```
[
    {
        "itemId": 3,
        "itemName": "lemon cookie",
        "itemType": "cookie"
    }
]
```

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

Example of API response:

```
{
    "orderId": 1,
    "customerName": "Candace Heller",
    "itemId": 4,
    "itemName": "chocolate cupcake"
}
```

### Get all orders

GET `/orders`\
Returns a list of all orders.

Example of API response:

```
[
    {
        "orderId": 1,
        "customerName": "Rosemarie Koch",
        "itemId": 1,
        "itemName": "chocolate chip cookie"
    },
    {
        "orderId": 2,
        "customerName": "Gerald Schamberger",
        "itemId": 3,
        "itemName": "lemon cookie"
    }
]
```

### Update an order

PATCH `/orders`\
Updates an existing order.

Required path variable:

- orderId

Request body:
The body must be formatted in JSON and contain a customerName or itemId. Both parameters may be included, but the body cannot be empty.

- customerName
- itemId

Example of API response:

```
{
    "orderId": 3,
    "customerName": "Benny Sawayn",
    "itemId": 4,
    "itemName": "chocolate cupcake"
}
```

### Delete an order

DELETE `/orders/:orderId`\
Deletes an order.

Required path variable:

- orderId

Note: A delete request returns a status code 204.

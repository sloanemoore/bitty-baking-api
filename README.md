# Bitty Baking API Documentation

## About the Bitty Baking API

The Bitty Baking API uses Node, Express, and MySQL to query a database of menu items and orders on your computer.

If you feel comfortable setting the project up locally yourself, you may want to start by reviewing the Bitty Baking API endpoints listed below.

For those who would like a more guided approach, there are instructions for getting started with the Bitty Baking API at the bottom of this README. Then check out the Bitty Baking API endpoints below.

Finally, if you’re just interested in checking out the code, feel free to do so!

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

## Getting started with the Bitty Baking API

### Install MySQL, Node, and dependencies

#### Install MySQL

You will need MySQL to run the Bitty Baking API. If you do not already have it installed on your computer, you can download it here: https://www.mysql.com/downloads/

The installation process can be a bit tricky, so here are some helpful resources to help you troubleshoot any issues:

- [Official MySQL Installation Guide](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)
- [How To Install MySQL Server and Workbench - YouTube](https://www.youtube.com/watch?v=u96rVINbAUI)
- [How to download and install MySQL for MAC OS X - YouTube](https://www.youtube.com/watch?v=9sbUsbDWTE8)

#### Install Node and dependencies

1. If you do not already have Node installed, you can download it here: https://nodejs.org/en/download/

2. In your code editor, create a new folder. In the command line interface, access the folder you created.

3. Add Node to the project with the command line by using the command: `npm init`

4. You will then be prompted to set up the project. When you get to the “entry point” option, type: server.js. You can use the default values for all other options.

5. Next, install the following libraries using the command: `npm i express mysql2`

Optional dependency:

While it is not necessary to use this API, you may also want to install nodemon so your server will automatically restart after you save any changes.

Install nodemon globally with the command line using the command: `npm install -g nodemon`

You can learn more about the libraries below:

- Express: https://www.npmjs.com/package/express
- MySQL 2: https://www.npmjs.com/package/mysql2
- nodemon: https://www.npmjs.com/package//nodemon

### Create up the files

#### Set up the MySQL database file

1. Create a file in the root directory called db.js.

2. Go to GitHub, copy the code in the db-example.js file and paste it into your file.

3. In the “password” property, make sure to change “YOUR PASSWORD” to your personal MySQL password.

4. Save the file.

#### Set up the server

1. Create a file in the root directory called server.js.

2. Go to GitHub, copy the code in the server.js file and paste it into your file.

3. Save the file.

### Create the database in MySQL

1. In GitHub, go to the database.sql file and copy the code. Open the MySQL Workbench on your computer and create a new file.

2. Paste the code in the new file and run the code. Your workbench should now have a new database called “bittybaking” that has two tables: a “menu” table and an “orders” table.

3. Make sure the tables were created successfully:

- In MySQL Workbench, run the command: `SHOW COLUMNS FROM menu;` MySQL should output the schema for the menu table.

- Then run the command: `SELECT * FROM menu;` MySQL should output a table with 5 rows of data.

- Now run the command: `SHOW COLUMNS FROM orders;` MySQL should output the schema for the orders table.

### Test your connection

Start your server. If you installed nodemon, you can do this by running the command: `npm run start`

In your browser, navigate to http://localhost:5000/ You should see the greeting: “Welcome to the Bitty Baking API!”

In your terminal in your code editor, you should see the message: “Bitty Baking API: Server is running on port 5000!”

If you see both of these messages, you’re all set!

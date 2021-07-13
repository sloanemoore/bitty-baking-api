const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const pool = require("./db");
const { query } = require("./db");

// MIDDLEWARE

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ROUTES

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Bitty Baking API!" });
});

// get api status -- GET /status
app.get("/status", (req, res) => {
  res.json({ status: res.statusCode });
});

// get all menu items -- GET /menu
app.get("/menu", async (req, res) => {
  const itemType = req.query.itemType;
  try {
    if (itemType) {
      const menu = await pool.query("SELECT * FROM menu WHERE itemType = ?", [
        itemType,
      ]);
      if (menu[0].length) {
        res.status(200).json(menu[0]);
      } else {
        res.status(404).json({ error: "itemType not found in menu" });
      }
    } else {
      const menu = await pool.query("SELECT * FROM menu");
      res.status(200).json(menu[0]);
    }
  } catch (error) {
    console.error(error.message);
  }
});

// get a menu item -- GET /menu/:itemId
app.get("/menu/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const menuItem = await pool.query("SELECT * FROM menu WHERE itemId = ?", [
      itemId,
    ]);
    if (menuItem[0].length) {
      res.status(200).json(menuItem[0]);
    } else {
      res.status(404).json({ error: "itemId not found in menu" });
    }
  } catch (error) {
    res.render("error", { error: err });
  }
});

// create an order -- POST /orders
app.post("/orders", async (req, res) => {
  try {
    const { customerName, itemId } = req.body;
    if (!customerName || !itemId) {
      res.status(400).json({ error: "customerName and itemId cannot be null" });
    } else {
      const menuItem = await pool.query("SELECT * FROM menu WHERE itemId = ?", [
        itemId,
      ]);
      if (menuItem[0].length) {
        const newOrder = await pool.query(
          "INSERT INTO orders (customerName, itemId) VALUES (?, ?)",
          [customerName, itemId]
        );
        const lastOrderId = await pool.query("SELECT LAST_INSERT_ID()");
        const orderId = lastOrderId[0][0]["LAST_INSERT_ID()"];
        let menuItemName = await pool.query(
          "SELECT itemName FROM menu WHERE itemId = ?",
          [itemId]
        );
        let itemName = menuItemName[0][0]["itemName"];
        res.status(201).json({ orderId, customerName, itemId, itemName });
      } else {
        res.status(404).json({ error: "itemId not found in menu" });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});

// get an order -- GET /orders/:orderId
app.get("/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await pool.query("SELECT * FROM orders WHERE orderId = ?", [
      orderId,
    ]);
    if (order[0].length) {
      const itemId = order[0][0].itemId;
      let menuItemName = await pool.query(
        "SELECT itemName FROM menu WHERE itemId = ?",
        [itemId]
      );
      let itemName = menuItemName[0][0]["itemName"];
      res.status(200).json({ ...order[0][0], itemName });
    } else {
      res.status(404).json({ error: "orderId not found in orders" });
    }
  } catch (error) {
    console.error(error.message);
  }
});

// get all orders -- GET /orders
app.get("/orders", async (req, res) => {
  try {
    const ordersFromOrderTable = await pool.query("SELECT * FROM orders");
    const ordersArray = ordersFromOrderTable[0];
    const orders = await Promise.all(
      ordersArray.map(async (item) => {
        const itemId = item["itemId"];
        const menuItemName = await pool.query(
          "SELECT itemName FROM menu WHERE itemId = ?",
          [itemId]
        );
        const itemName = menuItemName[0][0]["itemName"];
        return { ...item, ...{ itemName } };
      })
    );
    res.status(200).json([...orders]);
  } catch (error) {
    console.error(error.message);
  }
});

// update an order -- PATCH /orders
app.patch("/orders/:orderId", async (req, res) => {
  try {
    const { customerName, itemId } = req.body;
    const orderId = parseInt(req.params.orderId);
    const order = await pool.query("SELECT * FROM orders WHERE orderId = ?", [
      orderId,
    ]);
    if (order[0].length === 0) {
      res.status(404).json({ error: "orderId not found in orders" });
    }
    if (!customerName && !itemId) {
      res
        .status(400)
        .json({ error: "Provide a customerName and / or itemId to update" });
    }
    if (customerName) {
      const updateCustomerName = await pool.query(
        "UPDATE orders SET customerName = ? WHERE orderId = ?",
        [customerName, orderId]
      );
    }
    if (itemId) {
      const updateOrderItem = await pool.query(
        "UPDATE orders SET itemId = ? WHERE orderId = ?",
        [itemId, orderId]
      );
    }
    const updatedOrder = await pool.query(
      "SELECT * FROM orders WHERE orderId = ?",
      [orderId]
    );
    const menuItemId = updatedOrder[0][0].itemId;
    let menuItemName = await pool.query(
      "SELECT itemName FROM menu WHERE itemId = ?",
      [menuItemId]
    );
    let itemName = menuItemName[0][0]["itemName"];
    res.status(200).json({ ...updatedOrder[0][0], itemName });
  } catch (error) {
    console.error(error.message);
  }
});

// delete an order -- DELETE /orders/:orderId
app.delete("/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await pool.query("SELECT * FROM orders WHERE orderId = ?", [
      orderId,
    ]);
    if (order[0].length) {
      const deleteOrder = await pool.query(
        "DELETE FROM orders WHERE orderId = ?",
        [orderId]
      );
      res.status(204).json();
    } else {
      res.status(404).json({ error: "orderId not found in orders" });
    }
  } catch (error) {
    console.error(error.message);
  }
});

// set port, listen for requests
app.listen(port, () => {
  console.log(`Bitty Baking API: Server is running on port ${port}!`);
});

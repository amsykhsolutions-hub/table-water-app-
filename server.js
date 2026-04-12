const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files (frontend)
app.use(express.static("public"));

// Helper: get data path
const dataPath = path.join(__dirname, "data", "orders.json");


// ✅ GET ALL ORDERS
app.get("/orders", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read orders" });
  }
});


// ✅ CREATE ORDER
app.post("/order", (req, res) => {
  try {
    const newOrder = req.body;

    newOrder.date = new Date().toLocaleString();
    newOrder.status = "Pending";

    const orders = JSON.parse(fs.readFileSync(dataPath));
    orders.push(newOrder);

    fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

    res.json({ message: "Order sent successfully!" });

  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});


// ✅ DELETE ORDER (BY INDEX)
app.post("/delete-order/:index", (req, res) => {
  try {
    const index = parseInt(req.params.index);

    const orders = JSON.parse(fs.readFileSync(dataPath));

    if (index < 0 || index >= orders.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    orders.splice(index, 1);

    fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

    res.json({ message: "Order deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});


// ✅ MARK AS DELIVERED (BY INDEX)
app.post("/deliver-order/:index", (req, res) => {
  try {
    const index = parseInt(req.params.index);

    const orders = JSON.parse(fs.readFileSync(dataPath));

    if (index < 0 || index >= orders.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    orders[index].status = "Delivered";

    fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

    res.json({ message: "Order updated successfully" });

  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

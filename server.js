const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// create data folder + file if not exist
const dataDir = path.join(__dirname, 'data');
const filePath = path.join(dataDir, 'orders.json');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]');
}

// test route
app.get('/', (req, res) => {
  res.send("Backend is running");
});

// get orders
app.get('/orders', (req, res) => {
  const orders = JSON.parse(fs.readFileSync(filePath));
  res.json(orders);
});

// post order
app.post('/order', (req, res) => {
  const newOrder = req.body;
  newOrder.date = new Date().toLocaleString();
  newOrder.status = "Pending";

  const orders = JSON.parse(fs.readFileSync(filePath));
  orders.push(newOrder);

  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

  res.json({ message: "Order saved successfully!" });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
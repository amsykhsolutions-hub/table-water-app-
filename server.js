const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔥 USE RELATIVE PATH
app.use(express.static(__dirname));

app.get('/orders', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'orders.json');
  const data = JSON.parse(fs.readFileSync(dataPath));
  res.json(data);
});

app.post('/order', (req, res) => {
  const newOrder = req.body;
  newOrder.date = new Date().toLocaleString();
  newOrder.status = "Pending";

  const dataPath = path.join(__dirname, 'data', 'orders.json');
  const orders = JSON.parse(fs.readFileSync(dataPath));
  orders.push(newOrder);

  fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

  res.json({ message: 'Order sent successfully!' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
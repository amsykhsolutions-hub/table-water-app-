const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const dataPath = path.join(__dirname, "data", "orders.json");

if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]));
}

// GET ORDERS
app.get("/orders", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath));
    res.json(data);
  } catch {
    res.status(500).json({ error: "read error" });
  }
});

// CREATE ORDER
app.post("/order", (req, res) => {
  try {
    const orders = JSON.parse(fs.readFileSync(dataPath));

    const newOrder = req.body;
    newOrder.date = new Date().toLocaleString();
    newOrder.status = "Pending";

    orders.push(newOrder);

    fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

    res.json({ message: "ok" });
  } catch {
    res.status(500).json({ error: "save error" });
  }
});

// DELETE
app.post("/delete-order/:index", (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const orders = JSON.parse(fs.readFileSync(dataPath));

    orders.splice(index, 1);

    fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

    res.json({ message: "deleted" });
  } catch {
    res.status(500).json({ error: "delete error" });
  }
});

// DELIVER
app.post("/deliver-order/:index", (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const orders = JSON.parse(fs.readFileSync(dataPath));

    orders[index].status = "Delivered";

    fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

    res.json({ message: "updated" });
  } catch {
    res.status(500).json({ error: "update error" });
  }
});

// CONTACT (ONLY FIXED, NO EXTRA CHANGE)
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abdullahimuhammadiyudi620@gmail.com",
        pass: "hhdq perb fyvw ifyv"
      }
    });

    await transporter.sendMail({
      from: "Website Contact",
      to: "YOUR_EMAIL@gmail.com",
      subject: "New Contact Message",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.json({ success: true });

  } catch {
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

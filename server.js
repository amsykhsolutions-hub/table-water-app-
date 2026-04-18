
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Amsykhsolutions-hub:MSYmadobi%236206@admin.isv57p9.mongodb.net/table-water-app?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB ERROR:", err));

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* =====================
   MONGODB MODEL
===================== */
const orderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  location: String,
  quantity: Number,
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: String,
    default: () => new Date().toLocaleString()
  }
});

const Order = mongoose.model("Order", orderSchema);

/* =====================
   GET ORDERS
===================== */
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
    res.json(orders);
  } catch {
    res.status(500).json({ error: "read error" });
  }
});

/* =====================
   CREATE ORDER
===================== */
app.post("/order", async (req, res) => {
  try {
    const newOrder = new Order({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address || "N/A",
      location: req.body.location,
      quantity: req.body.quantity
    });

    await newOrder.save();

    res.json({ message: "ok" });
  } catch (err) {
    console.log("ORDER ERROR:", err); // 👈 helps debugging even without console
    res.status(500).json({ error: "save error" });
  }
});

/* =====================
   DELETE (USING _id)
===================== */
app.delete("/order/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted" });
  } catch {
    res.status(500).json({ error: "delete error" });
  }
});

/* =====================
   DELIVER (USING _id)
===================== */
app.put("/order/:id/deliver", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: "Delivered"
    });

    res.json({ message: "updated" });
  } catch {
    res.status(500).json({ error: "update error" });
  }
});

/* =====================
   CONTACT (UNCHANGED)
===================== */
app.post("/contact", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (!name || !email || !message) {
    return res.json({ success: false, error: "Missing fields" });
  }

  res.json({ success: true });

  const transporter = require("nodemailer").createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "abdullahimuhdsiyudi620@gmail.com",
      pass: "hhdqperbfyvwifyv"
    }
  });

  transporter.sendMail({
    from: `"MSY Website" <abdullahimuhdsiyudi620@gmail.com>`,
    to: "abdullahimuhdsiyudi620@gmail.com",
    subject: "New Contact Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  }).catch(console.error);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

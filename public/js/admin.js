console.log("Admin JS Loaded");

 const API = "https://daily-pride-tablewater.onrender.com";// Your Termux IP

document.addEventListener("DOMContentLoaded", () => {
  loadOrders();
});

// Load orders from backend
async function loadOrders() {
  try {
    console.log("Fetching orders from:", API);
    const response = await fetch(`${API}/orders`);
    console.log("Response status:", response.status);

    if (!response.ok) throw new Error("Failed to fetch orders");

    const orders = await response.json();
    console.log("Orders from backend:", orders);

    const tbody = document.getElementById("ordersBody");
    if (!tbody) {
      console.error("Table body not found!");
      return;
    }
    tbody.innerHTML = "";

    orders.forEach((order, index) => {
      // Auto fill date & status if missing
      const date = order.date || new Date().toLocaleString();
      const status = order.status || "Pending";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${order.name || ""}</td>
        <td>${order.phone || ""}</td>
        <td>${order.location || ""}</td>
        <td>${order.product || ""}</td>
        <td>${order.quantity || ""}</td>
        <td>${date}</td>
        <td>${status}</td>
        <td>
          <button onclick="updateStatus(${index}, 'Completed')">Mark Completed</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (error) {
    console.error("Error loading orders:", error);
  }
}

// Update order status
async function updateStatus(index, status) {
  try {
    const response = await fetch(`${API}/orders/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, status })
    });

    if (!response.ok) throw new Error("Update failed");

    const data = await response.json();
    console.log("Status update response:", data);

    loadOrders(); // refresh table
  } catch (error) {
    console.error("Error updating status:", error);
  }
}
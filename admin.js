console.log("Admin JS Loaded");

const API = "http://127.0.0.1:3000";

document.addEventListener("DOMContentLoaded", () => {
  loadOrders();
});

async function loadOrders() {
  try {
    console.log("Fetching orders from:", API);
    const response = await fetch(`${API}/orders`);
    console.log("Response status:", response.status);

    const orders = await response.json();
    console.log("Orders:", orders);

    const tbody = document.getElementById("ordersBody");
    console.log("TBODY element:", tbody);

    if (!tbody) {
      console.error("Table body not found! Check ID and script location.");
      return;
    }

    tbody.innerHTML = "";

    if (!orders || orders.length === 0) {
      tbody.innerHTML = "<tr><td colspan='9'>No Orders Found</td></tr>";
      return;
    }

    orders.forEach((order, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${order.name || ""}</td>
        <td>${order.phone || ""}</td>
        <td>${order.location || ""}</td>
        <td>${order.product || ""}</td>
        <td>${order.quantity || ""}</td>
        <td>${order.date || "N/A"}</td>
        <td style="color:${order.status === 'Completed' ? 'green' : 'orange'}">
  ${order.status || "Pending"}
</td>
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

async function updateStatus(index, status) {
  try {
    const response = await fetch(`${API}/orders/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, status })
    });

    if (!response.ok) throw new Error("Update failed");

    const data = await response.json();
    console.log("Update Response:", data);

    loadOrders(); // refresh table after update

  } catch (error) {
    console.error("Error updating status:", error);
  }
}
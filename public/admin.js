const BASE_URL = "https://daily-pride-tablewater.onrender.com";

async function loadOrders() {
  try {
    const res = await fetch(`${BASE_URL}/orders`);
    const orders = await res.json();

    const table = document.getElementById("ordersTable");

    if (!table) {
      alert("Table not found");
      return;
    }

    table.innerHTML = "";

    orders.forEach((order) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${order.name || ""}</td>
        <td>${order.phone || ""}</td>
        <td>${order.location || order.address || ""}</td>
        <td>${order.quantity || ""}</td>
        <td>${order.status || "Pending"}</td>
        <td>
          <button onclick="markDelivered('${order._id}', this)">Deliver</button>
          <button onclick="deleteOrder('${order._id}', this)">Delete</button>
        </td>
      `;

      table.appendChild(row);
    });

  } catch (err) {
    alert("Error loading orders");
    console.error(err);
  }
}


// DELETE (USE _id)
async function deleteOrder(id, btn) {
  try {
    await fetch(`${BASE_URL}/order/${id}`, {
      method: "DELETE"
    });

    btn.closest("tr").remove();
  } catch (err) {
    alert("Delete failed");
    console.error(err);
  }
}


// DELIVER (USE _id)
async function markDelivered(id, btn) {
  try {
    await fetch(`${BASE_URL}/order/${id}/deliver`, {
      method: "PUT"
    });

    const row = btn.closest("tr");
    if (row) {
      row.children[4].innerText = "Delivered";
    }

  } catch (err) {
    alert("Update failed");
    console.error(err);
  }
}


// LOAD
setTimeout(loadOrders, 500);

const BASE_URL = "https://daily-pride-tablewater.onrender.com";

async function loadOrders() {
  try {
    const res = await fetch(`${BASE_URL}/orders`);
    const orders = await res.json();

    const table = document.getElementById("ordersTable");

    // SAFETY CHECK
    if (!table) {
      alert("Table not found");
      return;
    }

    table.innerHTML = "";

    orders.forEach((order, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${order.name || ""}</td>
        <td>${order.phone || ""}</td>
        <td>${order.location || order.address || ""}</td>
        <td>${order.quantity || ""}</td>
        <td id="status-${index}">${order.status || "Pending"}</td>
        <td>
          <button onclick="markDelivered(${index}, this)">Deliver</button>
          <button onclick="deleteOrder(${index}, this)">Delete</button>
        </td>
      `;

      table.appendChild(row);
    });

  } catch (err) {
    alert("Error loading orders");
  }
}


// DELETE
async function deleteOrder(index, btn) {
  try {
    await fetch(`${BASE_URL}/delete-order/${index}`, {
      method: "POST"
    });

    btn.closest("tr").remove();
  } catch (err) {
    alert("Delete failed");
  }
}


// DELIVER
async function markDelivered(index, btn) {
  try {
    await fetch(`${BASE_URL}/deliver-order/${index}`, {
      method: "POST"
    });

    const status = document.getElementById(`status-${index}`);
    if (status) status.innerText = "Delivered";

  } catch (err) {
    alert("Update failed");
  }
}


// FORCE RUN (NO RELY ON EVENTS)
setTimeout(loadOrders, 500);

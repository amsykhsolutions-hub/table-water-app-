const BASE_URL = "https://daily-pride-tablewater.onrender.com";

// Load all orders
async function loadOrders() {
  try {
    const res = await fetch(`${BASE_URL}/orders`);
    const orders = await res.json();

    const table = document.getElementById("ordersTable");
    table.innerHTML = "";

    orders.forEach((order, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${order.name}</td>
        <td>${order.phone}</td>
        <td>${order.address}</td>
        <td>${order.quantity}</td>
        <td id="status-${index}">${order.status}</td>
        <td>
          <button onclick="markDelivered(${index}, this)">Deliver</button>
          <button onclick="deleteOrder(${index}, this)">Delete</button>
        </td>
      `;

      table.appendChild(row);
    });

  } catch (err) {
    alert("Failed to load orders");
  }
}


// Delete order
async function deleteOrder(index, btn) {
  if (!confirm("Are you sure you want to delete this order?")) return;

  btn.innerText = "Deleting...";
  btn.disabled = true;

  try {
    const res = await fetch(`${BASE_URL}/delete-order/${index}`, {
      method: "POST"
    });

    if (!res.ok) throw new Error();

    btn.closest("tr").remove();

  } catch (err) {
    alert("Delete failed");

    btn.innerText = "Delete";
    btn.disabled = false;
  }
}


// Mark as delivered
async function markDelivered(index, btn) {
  btn.innerText = "Processing...";
  btn.disabled = true;

  try {
    const res = await fetch(`${BASE_URL}/deliver-order/${index}`, {
      method: "POST"
    });

    if (!res.ok) throw new Error();

    document.getElementById(`status-${index}`).innerText = "Delivered";

    btn.innerText = "Delivered";

  } catch (err) {
    alert("Update failed");

    btn.innerText = "Deliver";
    btn.disabled = false;
  }
}


// Run on page load
window.onload = loadOrders;

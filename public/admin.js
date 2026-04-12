alert("ADMIN JS IS WORKING");
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
    console.error(err);
    alert("Failed to load orders");
  }
}


// Delete order (NO REFRESH)
async function deleteOrder(index, btn) {
  if (!confirm("Are you sure you want to delete this order?")) return;

  btn.innerText = "Deleting...";
  btn.disabled = true;

  try {
    const res = await fetch(`${BASE_URL}/delete-order/${index}`, {
      method: "POST"
    });

    if (!res.ok) throw new Error();

    // Remove row instantly
    btn.closest("tr").remove();

  } catch (err) {
    console.error(err);
    alert("Failed to delete order");

    btn.innerText = "Delete";
    btn.disabled = false;
  }
}


// Mark as delivered (NO REFRESH)
async function markDelivered(index, btn) {
  btn.innerText = "Processing...";
  btn.disabled = true;

  try {
    const res = await fetch(`${BASE_URL}/deliver-order/${index}`, {
      method: "POST"
    });

    if (!res.ok) throw new Error();

    // Update status instantly
    document.getElementById(`status-${index}`).innerText = "Delivered";

    btn.innerText = "Delivered";

  } catch (err) {
    console.error(err);
    alert("Failed to update status");

    btn.innerText = "Deliver";
    btn.disabled = false;
  }
}


// Initial load
loadOrders();

const BASE_URL = "https://daily-pride-tablewater.onrender.com";

async function loadOrders() {
  const res = await fetch(`${BASE_URL}/orders`);
  const orders = await res.json();

  const table = document.getElementById("ordersTable");
  table.innerHTML = "";

  orders.forEach((order, index) => {
    const row = `
      <tr>
        <td>${order.name}</td>
        <td>${order.phone}</td>
        <td>${order.address}</td>
        <td>${order.quantity}</td>
        <td>${order.status}</td>
        <td>
          <button onclick="markDelivered(${index})">Delivered</button>
          <button onclick="deleteOrder(${index})">Delete</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

async function deleteOrder(index) {
  await fetch(`${BASE_URL}/delete-order/${index}`, {
    method: "POST"
  });
  location.reload();
}

async function markDelivered(index) {
  await fetch(`${BASE_URL}/deliver-order/${index}`, {
    method: "POST"
  });
  location.reload();
}

loadOrders();

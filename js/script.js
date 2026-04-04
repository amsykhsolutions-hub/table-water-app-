console.log("JS Loaded...");

// =================== Smooth Scroll ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// =================== Dark Mode Toggle ===================
const toggleBtn = document.getElementById("themeToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️";
    } else {
      toggleBtn.textContent = "🌙";
    }
  });
}

// =================== Menu Toggle ===================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// =================== Order Form ===================
const form = document.getElementById("orderForm");

if (form) {
  const message = document.createElement("p");
  message.style.marginTop = "10px";
  form.appendChild(message);

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const orderData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      location: document.getElementById("location").value,
      product: document.getElementById("product").value,
      quantity: document.getElementById("quantity").value
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      console.log("STATUS:", response.status);

      if (!response.ok) throw new Error("Failed");

      const data = await response.json();

      message.textContent = data.message;
      message.style.color = "green";

      form.reset();

    } catch (error) {
      console.error("ERROR:", error);
      message.textContent = "Error sending order!";
      message.style.color = "red";
    }
  });
}
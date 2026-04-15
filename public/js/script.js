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

    toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
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

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const orderData = {
      name: document.getElementById("name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      location: document.getElementById("location").value.trim(),
      product: document.getElementById("product").value,
      quantity: document.getElementById("quantity").value
    };

    // Simple validation
    if (!orderData.name || !orderData.phone || !orderData.location || !orderData.product || !orderData.quantity) {
      message.textContent = "Please fill all fields";
      message.style.color = "red";
      return;
    }

    try {
      const response = await fetch("https://daily-pride-tablewater.onrender.com/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error(`Network error: ${response.status}`);

      const data = await response.json();
      console.log("Order response:", data);

      message.textContent = "Order sent successfully!";
      message.style.color = "green";

      form.reset(); // Clear form fields

    } catch (error) {
      console.error("Error sending order:", error);
      message.textContent = "Error sending order. Try again!";
      message.style.color = "red";
    }
  });
}
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const msg = document.createElement("p");
  msg.style.marginTop = "10px";
  contactForm.appendChild(msg);

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("cname");
const emailInput = document.getElementById("cemail");
const messageInput = document.getElementById("cmessage");

const data = {
  name: nameInput ? nameInput.value : "",
  email: emailInput ? emailInput.value : "",
  message: messageInput ? messageInput.value : ""
};

    if (!data.name || !data.email || !data.message) {
      msg.textContent = "Please fill all fields";
      msg.style.color = "red";
      return;
    }

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.success) {
        msg.textContent = "Message sent successfully!";
        msg.style.color = "green";
        contactForm.reset();
      } else {
        msg.textContent = "Failed to send message";
        msg.style.color = "red";
      }

    } catch (err) {
      msg.textContent = "Network error";
      msg.style.color = "red";
    }
  });
}

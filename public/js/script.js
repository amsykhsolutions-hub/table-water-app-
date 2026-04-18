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
const orderForm = document.getElementById("orderForm");

if (orderForm) {
  const message = document.createElement("p");
  message.style.marginTop = "10px";
  orderForm.appendChild(message);

  orderForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const orderData = {
      name: document.getElementById("name").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(), // REQUIRED
      location: document.getElementById("location").value.trim(),
      quantity: Number(document.getElementById("quantity").value)
    };

    // Validation
    if (!orderData.name || !orderData.phone || !orderData.address || !orderData.location || !orderData.quantity) {
      message.textContent = "Please fill all fields";
      message.style.color = "red";
      return;
    }

    try {
      const response = await fetch("https://daily-pride-tablewater.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed");
      }

      message.textContent = "Order sent successfully! 🎉";
      message.style.color = "green";
      orderForm.reset();

    } catch (error) {
      console.error("Error sending order:", error);
      message.textContent = "Error sending order. Try again!";
      message.style.color = "red";
    }
  });
}

// =================== Contact Form ===================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const msg = document.createElement("p");
  msg.style.marginTop = "10px";
  contactForm.appendChild(msg);

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://daily-pride-tablewater.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: document.getElementById("cname").value,
          email: document.getElementById("cemail").value,
          message: document.getElementById("cmessage").value
        })
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
      console.error(err);
    }
  });
}







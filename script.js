// Load navbar.html dynamically
document.addEventListener("DOMContentLoaded", () => {
  const navbarPlaceholder = document.getElementById("navbar-placeholder");

  fetch("Navbar.html")
    .then(response => response.text())
    .then(data => {
      navbarPlaceholder.innerHTML = data;

      // Add hamburger menu toggle functionality after navbar is loaded
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("navLinks");

      if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });
      }
    })
    .catch(error => {
      console.error("Failed to load navbar:", error);
    });
});

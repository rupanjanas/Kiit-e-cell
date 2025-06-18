document.addEventListener('DOMContentLoaded', function () {
  // --- Navbar loader ---
 const navbarPlaceholder = document.getElementById('navbar-placeholder');

if (navbarPlaceholder) {
  fetch('Navbar.html')
    .then(response => {
      if (!response.ok) throw new Error('Navbar fetch failed');
      return response.text();
    })
    .then(html => {
      navbarPlaceholder.innerHTML = html;

      // Hamburger toggle logic
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("navLinks");
      if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("active");
        });
      }

      // Handle Events link animation + redirect
      const eventsLink = document.getElementById("eventsLink");
      if (eventsLink) {
        eventsLink.addEventListener("click", (e) => {
          e.preventDefault();
          document.body.classList.add("dissolve-out");
          setTimeout(() => {
            window.location.href = eventsLink.href;
          }, 600); // Match CSS animation duration
        });
      }

      // Optional: Apply style via JS (not recommended for static styles)
      // eventsLink.style.color = "#ff6600"; 
    })
    .catch(error => console.error('Navbar error:', error));
}


  // --- Footer loader ---
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('footer.html')
      .then(response => {
        if (!response.ok) throw new Error('Footer fetch failed');
        return response.text();
      })
      .then(html => {
        footerPlaceholder.innerHTML = html;
      })
      .catch(error => console.error('Footer error:', error));
  }

  // --- Event image register button logic ---
  const globalRegisterButtonContainer = document.querySelector('.global-register-button-container');
  const blurOverlay = document.getElementById('blurOverlay');
  let isRegisterButtonVisible = false;

  function showRegisterButton() {
    if (globalRegisterButtonContainer) globalRegisterButtonContainer.classList.add('active');
    if (blurOverlay) blurOverlay.classList.add('active');
    isRegisterButtonVisible = true;
  }

  function hideRegisterButton() {
    if (globalRegisterButtonContainer) globalRegisterButtonContainer.classList.remove('active');
    if (blurOverlay) blurOverlay.classList.remove('active');
    isRegisterButtonVisible = false;
  }

  const eventItems = document.querySelectorAll('.event-image');
  eventItems.forEach(item => {
    item.addEventListener('click', function () {
      if (!isRegisterButtonVisible) showRegisterButton();
    });
  });

  // --- Custom logic for Ideathon register button ---
  const ideathonBtn = document.getElementById('ideathonRegisterBtn');
  if (ideathonBtn) {
    ideathonBtn.addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent hiding overlay or opening login popup
      window.location.href = 'errorpage.html';
    });
  }

  // --- Optional: Add similar handlers for other event buttons if needed ---
  const otherRegisterButtons = document.querySelectorAll('.register-btn');
  otherRegisterButtons.forEach(btn => {
    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      openLoginPopup();
    });
  });

  document.addEventListener('click', function (event) {
    if (isRegisterButtonVisible) {
      const clickedElement = event.target;
      const insideButton = globalRegisterButtonContainer.contains(clickedElement);
      const onImage = Array.from(eventItems).some(item => item.contains(clickedElement));
      if (!insideButton && !onImage) hideRegisterButton();
    }
  });
});

// ✅ These functions must be declared outside DOMContentLoaded to be globally accessible
function openLoginPopup() {
  document.body.style.overflow = 'hidden';

  const popupContainer = document.createElement('div');
  popupContainer.className = 'popup-container';
  popupContainer.addEventListener('click', (e) => {
    if (e.target === popupContainer) closePopup();
  });

  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';

  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = closePopup;

  fetch('login.html')
    .then(response => response.text())
    .then(html => {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const innerHTML = temp.querySelector('body')?.innerHTML || html;

      popupContent.innerHTML = innerHTML;
      popupContent.appendChild(closeButton);

      popupContainer.appendChild(popupContent);
      document.body.appendChild(popupContainer);
    })
    .catch(error => {
      console.error('Error loading login.html:', error);
      alert('Login popup failed to load.');
      document.body.style.overflow = '';
    });

  function closePopup() {
    popupContainer.remove();
    document.body.style.overflow = '';
  }
}

function handleRegister() {
  window.location.href = "errorpage.html";
}

function scrollToSection(event, id) {
  event.preventDefault();

  const target = document.getElementById(id);
  if (!target) return;

  const y = target.getBoundingClientRect().top + window.scrollY;

  gsap.to(window, {
    duration: 1.5,
    scrollTo: y,
    ease: "elastic.out(1, 0.3)" // mimics spring-like motion
  });
}
function animateAndRedirectTo(url) {
  // Apply the dissolve animation to the entire body
  document.body.classList.add('dissolve-out');

  // Wait for animation to finish, then redirect
  setTimeout(() => {
    window.location.href = url;
  }, 600); // match duration
}


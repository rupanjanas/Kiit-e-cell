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
        const hamburger = document.getElementById("hamburger");
        const navLinks = document.getElementById("navLinks");
        if (hamburger && navLinks) {
          hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
          });
        }
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
  const mainRegisterBtn = document.getElementById('mainRegisterBtn');
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

  if (mainRegisterBtn) {
    mainRegisterBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      alert('Register Button Clicked!');
    });
  }

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

function handleRegister(button) {
  const eventName = button.getAttribute("data-event").trim().toLowerCase();

  if (eventName === "Ideathon") {
    window.location.href = "errorpage.html";
  } else {
    openLoginPopup();
  }
}


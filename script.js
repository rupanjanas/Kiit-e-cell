document.addEventListener('DOMContentLoaded', function() {
    // --- Navbar loader ---
   // Load Navbar dynamically into the placeholder
const navbarPlaceholder = document.getElementById('navbar-placeholder');

if (navbarPlaceholder) {
  fetch('Navbar.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load Navbar.html: ' + response.statusText);
      }
      return response.text();
    })
    .then(html => {
      navbarPlaceholder.innerHTML = html;

      // Wait for DOM insertion to complete
      setupNavbarToggle();
    })
    .catch(error => console.error('Navbar load error:', error));
}

function setupNavbarToggle() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  } else {
    console.warn("Hamburger or navLinks not found in loaded Navbar.");
  }
}

    // --- Footer loader ---
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {        
        fetch('footer.html') // Ensure this path and filename are correct ('Footer.html' vs 'footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response for Footer.html was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => console.error('Failed to load footer:', error));
    }
            
    // --- Global Register Button & Blur Overlay Logic ---
    const globalRegisterButtonContainer = document.querySelector('.global-register-button-container');
    const mainRegisterBtn = document.getElementById('mainRegisterBtn'); // Ensure this ID matches your HTML button
    const blurOverlay = document.getElementById('blurOverlay'); // Select the blur overlay

    let isRegisterButtonVisible = false; // Flag to track button visibility

    // Function to show the button and blur
    function showRegisterButton() {
        if (globalRegisterButtonContainer) {
            globalRegisterButtonContainer.classList.add('active');
            isRegisterButtonVisible = true;
        }
        if (blurOverlay) {
            blurOverlay.classList.add('active'); // Activate the blur overlay
        }
    }

    // Function to hide the button and unblur
    function hideRegisterButton() {
        if (globalRegisterButtonContainer) {
            globalRegisterButtonContainer.classList.remove('active');
            isRegisterButtonVisible = false;
        }
        if (blurOverlay) {
            blurOverlay.classList.remove('active'); // Deactivate the blur overlay
        }
    }

    // --- Event Image Click Logic (to show global button and blur) ---
    // Select the parent .event-item divs, as clicks on them are usually desired.
    // If you explicitly only want clicks on the <img> tag itself, change to '.event-image'
    const eventItems = document.querySelectorAll('.event-image');

    eventItems.forEach(item => {
        item.addEventListener('click', function() {
            if (!isRegisterButtonVisible) { // Only show if not already visible
                showRegisterButton();
            }
            // If the button is already visible, clicking another image won't hide it.
        });
    });

    // --- What happens when the Main Register Button itself is clicked ---
    if (mainRegisterBtn) {
        mainRegisterBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent this click from bubbling up to document and hiding the button immediately
            openLoginPopup(); // Open the login popup
        });
    }

    document.addEventListener('click', function(event) {
        if (isRegisterButtonVisible) { // Only act if the button is currently visible
            const clickedElement = event.target;

            // Check if the click is inside the button container
            // (i.e., on the button itself or any element within its container)
            const isClickInsideButtonContainer = globalRegisterButtonContainer.contains(clickedElement);

            // Check if the click is on any of the event images/cards
            // (i.e., on an .event-item div or any element within an .event-item)
            const isClickOnEventItem = Array.from(eventItems).some(item => item.contains(clickedElement));

            // If the click was NOT inside the button/its container
            // AND was NOT on an event image/card, then hide
            if (!isClickInsideButtonContainer && !isClickOnEventItem) {
                hideRegisterButton();
            }
        }
    });
    function animateAndRedirectTo(url) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = url;
  }, 6000); // Match CSS duration
}

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

});


function openLoginPopup() {
  // Create the popup container
  const popupContainer = document.createElement('div');
  popupContainer.className = 'popup-container';

  // Create the popup content
  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';

  // Add a close button
  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = function () {
    document.body.removeChild(popupContainer);
  };

  // Append close button immediately (before loading)
  popupContent.appendChild(closeButton);

  // Fetch the actual login.html content and inject into popup
  fetch('login.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load login.html');
      return response.text();
    })
    .then(html => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      popupContent.appendChild(wrapper);
    })
    .catch(err => {
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'Error loading login form.';
      popupContent.appendChild(errorMsg);
      console.error(err);
    });

  // Append content to the container and container to body
  popupContainer.appendChild(popupContent);
  document.body.appendChild(popupContainer);

   popupContainer.addEventListener('click', function (event) {
    if (!popupContent.contains(event.target)) {
      document.body.removeChild(popupContainer);
    }
  });
}

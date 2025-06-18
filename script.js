document.addEventListener('DOMContentLoaded', function() {
    // --- Navbar loader ---
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('Navbar.html') // Ensure this path and filename are correct ('Navbar.html' vs 'navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response for Navbar.html was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                navbarPlaceholder.innerHTML = html;

                // Add hamburger menu toggle functionality after navbar is loaded
                const hamburger = document.getElementById("hamburger");
                const navLinks = document.getElementById("navLinks");

                if (hamburger && navLinks) {
                    hamburger.addEventListener("click", () => {
                        navLinks.classList.toggle("active");
                    });
                }
            })
            .catch(error => console.error('Failed to load navbar:', error));
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
            alert('Register Button Clicked! (You can add your registration logic here)');
            // Optional: Hide the button and blur after it's clicked, if it's a one-time action
            // hideRegisterButton();
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
});
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
function animateAndRedirect(link) {
  document.body.classList.add('fade-out');

  // Delay based on the animation duration
  setTimeout(() => {
    window.location.href = link;
  }, 600); // Adjust the delay to match your CSS animation duration (600ms in this case)
}
function openLoginPopup() {
  // Prevent scrolling in the background
  document.body.style.overflow = 'hidden';

  // Create the popup overlay
  const popupContainer = document.createElement('div');
  popupContainer.className = 'popup-container';

  // Close popup on click outside
  popupContainer.addEventListener('click', (e) => {
    if (e.target === popupContainer) {
      closePopup();
    }
  });

  // Create popup content box
  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';

  // Add close button
  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = closePopup;

  // Load login.html
  fetch('login.html')
    .then(response => response.text())
    .then(html => {
      // Strip outer HTML/body/head if present
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
    });

  // Close and clean up
  function closePopup() {
    document.body.removeChild(popupContainer);
    document.body.style.overflow = ''; // re-enable scroll
  }
}

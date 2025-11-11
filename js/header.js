// header.js - Updated version
function initializeHeader() {
  const headerMenu = document.getElementById("headerMobileMenu");
  const menuOpen = document.getElementById("headerMenuOpen");
  const menuClose = document.getElementById("headerMenuClose");

  if (!headerMenu || !menuOpen || !menuClose) {
    // Header not loaded yet, try again in 50ms
    setTimeout(initializeHeader, 50);
    return;
  }

  // ✅ Open menu
  menuOpen.addEventListener("click", () => {
    headerMenu.classList.add("active");
  });

  // ✅ Close menu
  menuClose.addEventListener("click", () => {
    headerMenu.classList.remove("active");
  });

  // ✅ Close when clicking a link
  const mobileLinks = document.querySelectorAll(".headersection-mobile-menu a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      headerMenu.classList.remove("active");
    });
  });
}

// Start initialization when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHeader);
} else {
  initializeHeader();
}
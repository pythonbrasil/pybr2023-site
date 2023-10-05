if(document.getElementById("hamburger-menu") && document.getElementById("navbarNav")) {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const menuItemsContainer = document.getElementById("navbarNav");
  hamburgerMenu.onclick = function() {
    hamburgerMenu.classList.toggle("menu-open");
    menuItemsContainer.classList.toggle("menu-open");
  };
}
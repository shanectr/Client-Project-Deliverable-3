document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");

  // Toggle the main menu visibility
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent click event from propagating to the document
    menu.classList.toggle("show");
  });

  // Function to toggle the submenu visibility and close the other submenu
  function toggleSubmenu(currentTeamItem) {
    const submenu = currentTeamItem.nextElementSibling; // Get the submenu

    // Get the other team's submenu
    const otherTeamItem =
      currentTeamItem === menTeamItem ? womenTeamItem : menTeamItem;
    const otherSubmenu = otherTeamItem.nextElementSibling;

    // Close the other submenu if it's open
    if (otherSubmenu.classList.contains("show")) {
      otherSubmenu.classList.remove("show");
    }

    // Toggle the current submenu
    submenu.classList.toggle("show");
  }

  // Toggle the submenu visibility for Men's Team
  const menTeamItem = menu.querySelector("li:nth-child(2) .team");
  menTeamItem.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent click event from propagating to the document
    toggleSubmenu(menTeamItem);
  });

  // Toggle the submenu visibility for Women's Team
  const womenTeamItem = menu.querySelector("li:nth-child(3) .team");
  womenTeamItem.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent click event from propagating to the document
    toggleSubmenu(womenTeamItem);
  });

  // Close the menu if clicking outside of it
  document.addEventListener("click", function (event) {
    // If the menu is open and the click is outside the menu or menu button, close the menu
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      menu.classList.remove("show");
    }
  });

  // Check if the current URL is the homepage
  const homePageLink = document.getElementById("home-page-link");
  if (
    window.location.pathname === "/Client-Project-Deliverable-3/" ||
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    // Hide the "Home Page" link
    homePageLink.style.display = "none";
  }
});

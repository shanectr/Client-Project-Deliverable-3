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

  // Get the current pathname
  const pathName = window.location.pathname;

  // Get the base URL of the GitHub Pages site
  const basePath = window.location.origin + window.location.pathname;

  // Check if the current page is the homepage (root of the site)
  if (pathName === "/" || basePath.endsWith("/")) {
    // Hide the "Home Page" link
    homePageLink.style.display = "none";
  }

  document.querySelectorAll("img").forEach((img) => {
    // Set the default image as the fallback
    img.src = img.src || "../images/default_image.jpg"; // Ensure the src is set if not already
    img.onerror = function () {
      this.onerror = null; // Prevents infinite loop if default image missing
      this.src = "../images/default_image.jpg";
      this.alt = "default runner image";
    };
  });
});

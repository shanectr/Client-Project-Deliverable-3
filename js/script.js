document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");

  // Toggle the main menu visibility
  menuButton.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent click event from propagating to the document
    menu.classList.toggle("show");
  });

  // Toggle the submenu visibility for Men's Team
  const menTeamItem = menu.querySelector("li:nth-child(2) .team");
  menTeamItem.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent click event from propagating to the document
    const submenu = menTeamItem.nextElementSibling; // Get the submenu
    submenu.classList.toggle("show");
  });

  // Toggle the submenu visibility for Women's Team
  const womenTeamItem = menu.querySelector("li:nth-child(3) .team");
  womenTeamItem.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent click event from propagating to the document
    const submenu = womenTeamItem.nextElementSibling; // Get the submenu
    submenu.classList.toggle("show");
  });

  // Close the menu if clicking outside of it
  document.addEventListener("click", function (event) {
    // If the menu is open and the click is outside the menu or menu button, close the menu
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      menu.classList.remove("show");
    }
  });
});

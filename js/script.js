document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const menu = document.getElementById("menu");

  // Toggle the main menu visibility
  menuButton.addEventListener("click", function () {
    menu.classList.toggle("show");
  });

  // Toggle the submenu visibility for Men's Team
  const menTeamItem = menu.querySelector("li:nth-child(2) .team");
  menTeamItem.addEventListener("click", function () {
    const submenu = menTeamItem.nextElementSibling; // Get the submenu
    submenu.classList.toggle("show"); // Toggle the submenu visibility
  });

  // Toggle the submenu visibility for Women's Team
  const womenTeamItem = menu.querySelector("li:nth-child(3) .team");
  womenTeamItem.addEventListener("click", function () {
    const submenu = womenTeamItem.nextElementSibling; // Get the submenu
    submenu.classList.toggle("show"); // Toggle the submenu visibility
  });
});

// Check for click events on the navbar burger icon
const profileIcon = document.querySelector("#profile-icon");
const dropdownMenu = $("#dropdown-menu");

const renderDropdown = (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (dropdownMenu.hasClass("hidden")) {
    dropdownMenu.removeClass("hidden");
  } else {
    dropdownMenu.addClass("hidden");
  }

//   document.addEventListener("click", (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     dropdownMenu.addClass("hidden");
//   });
};

profileIcon.addEventListener("click", renderDropdown);

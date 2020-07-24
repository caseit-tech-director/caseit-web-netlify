// JS Goes here - ES6 supported

import "./css/main.css";

// Say hello
console.log("🦊 Hello! Edit me in src/index.js");

// Hamburger menu module
window.addEventListener("load", (e) => {
  setupHamburgerMenu();
});

function setupHamburgerMenu() {
  let hamburgerMenuToggle = document.querySelector(".hamburger-menu-toggle");
  // let navMenu = document.querySelector(".nav-main");

  hamburgerMenuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      hamburgerMenuToggle.classList.contains("hamburger-menu-toggle--cross")
    ) {
      // meaning hamburger already opened
      hamburgerMenuToggle.classList.remove("hamburger-menu-toggle--cross");
      // navMenu.classList.remove("nav-main--expanded");
    } else {
      // hamburger menu is collapsed
      hamburgerMenuToggle.classList.add("hamburger-menu-toggle--cross");
      // navMenu.classList.add("nav-main--expanded");
    }
  });
}

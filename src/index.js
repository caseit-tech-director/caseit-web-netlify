// JS Goes here - ES6 supported

import "./css/main.css";

// Say hello
// console.log("🦊 Hello! Edit me in src/index.js");

// Hamburger menu module
window.addEventListener("DOMContentLoaded", (e) => {
  // init the AOS library
  AOS.init();

  // setup ui elements
  setupHamburgerMenu();
  setupMenuHideOnScroll();
  setupMenuScrolledLook();
});

function setupHamburgerMenu() {
  let hamburgerMenuToggle = document.querySelector(".hamburger-menu-toggle");
  let navMenu = document.querySelector(".nav-bar__link-container");

  hamburgerMenuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      hamburgerMenuToggle.classList.contains("hamburger-menu-toggle--cross")
    ) {
      // meaning hamburger already opened
      hamburgerMenuToggle.classList.remove("hamburger-menu-toggle--cross");
      navMenu.classList.remove("nav-bar__link-container--expanded");
      unlockBodyScroll();
    } else {
      // hamburger menu is collapsed
      hamburgerMenuToggle.classList.add("hamburger-menu-toggle--cross");
      navMenu.classList.add("nav-bar__link-container--expanded");
      lockBodyScroll();
    }
  });
}

// adapted from
// https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
function setupMenuHideOnScroll() {
  let prevScrollpos = window.pageYOffset;
  let minScrolPos = 50; // when does it start shrinking

  let hamburgerMenuToggle = document.querySelector(".hamburger-menu-toggle");
  let navBar = document.querySelector("nav");

  window.addEventListener("scroll", (e) => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos && currentScrollPos > minScrolPos) {
      // hide nav bar here
      if (
        !navBar.classList.contains("hidden") &&
        !hamburgerMenuToggle.classList.contains("hamburger-menu-toggle--cross")
      )
        navBar.classList.add("hidden");
    } else {
      // show nav bar here
      if (navBar.classList.contains("hidden"))
        navBar.classList.remove("hidden");
    }
    prevScrollpos = currentScrollPos;
  });
}

function setupMenuScrolledLook() {
  let scrolled = false;
  let navBar = document.querySelector("nav");

  window.addEventListener("scroll", (e) => {
    let currentScrollPos = window.pageYOffset;

    // setup "scrolled" look when back is not zero
    if (currentScrollPos != 0 && !scrolled) {
      navBar.classList.add("scrolled");
      scrolled = true;
    } else if (currentScrollPos == 0) {
      scrolled = false;
      navBar.classList.remove("scrolled");
    }
  });
}

function lockBodyScroll() {
  document.querySelector(".body-content-wrapper").classList.add("scroll-lock");
}

function unlockBodyScroll() {
  document
    .querySelector(".body-content-wrapper")
    .classList.remove("scroll-lock");
}

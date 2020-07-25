// JS Goes here - ES6 supported

import "./css/main.css";

// Say hello
// console.log("🦊 Hello! Edit me in src/index.js");

// Hamburger menu module
window.addEventListener("load", (e) => {
  // init the AOS library
  AOS.init();

  // setup ui elements
  setupHamburgerMenu();
  setupMenuHideOnScroll();
  setupMenuScrolledLook();
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

// adapted from
// https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
function setupMenuHideOnScroll() {
  let prevScrollpos = window.pageYOffset;
  let minScrolPos = 100; // when does it start shrinking

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

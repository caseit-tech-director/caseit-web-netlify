// JS Goes here - ES6 supported

import "./css/main.css";

import NumberDisplay from "./js/modules/number-display.js";

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

  // setup custom form element
  setupCopyableField();

  NumberDisplay.setup();

  // hide hamburger menu on resize
  window.addEventListener("resize", (e) => closeHamburgerMenu());
});

function setupCopyableField() {
  const copyableFields = document.querySelectorAll(".copyable-field");
  copyableFields.forEach((elm) => {
    const copyButton = elm.querySelector(".copyable-field__button");
    const copyText = elm.querySelector(".copyable-field__copyText");
    copyButton.addEventListener("click", (e) => {
      // copy the text
      copyTextToClipboard(copyText.innerHTML);
      // animate the text in
      playTextCopiedAnimation(elm);
    });
  });
  function playTextCopiedAnimation(containerElm) {
    const elm = document.createElement("div");
    elm.innerHTML = "Copied to clipboard!";
    elm.classList.add("hint-popup");
    elm.addEventListener(
      "animationend",
      (e) => {
        if (e.animationName.includes("exit")) containerElm.removeChild(elm);
      },
      false
    );
    containerElm.appendChild(elm);
  }
}

function copyTextToClipboard(text) {
  let copyText = document.createElement("input");
  copyText.type = "input";
  document.body.append(copyText);

  copyText.value = text;
  copyText.select();
  document.execCommand("copy");
  copyText.remove();
}

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

    if (
      (prevScrollpos < currentScrollPos && currentScrollPos > minScrolPos) ||
      !canShowMenu()
    ) {
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

function canShowMenu() {
  // check if table head is occupying the navigation bar top position,
  // the menu shouldn't be shown when the user viewing the table with it's stick heading
  const tableHead = document.querySelector("th");
  if (!tableHead) return true;
  const tableHeadPosition = tableHead.getBoundingClientRect().top;
  return tableHeadPosition !== 0;
}

function setupMenuScrolledLook() {
  let scrolled = false;
  let navBar = document.querySelector("nav");

  window.addEventListener("scroll", (e) => {
    let currentScrollPos = window.pageYOffset;

    // setup "scrolled" look when back is not zero
    if (currentScrollPos != 0 && !scrolled) {
      navBar.classList.add("main-nav--scrolled");
      scrolled = true;
    } else if (currentScrollPos == 0) {
      scrolled = false;
      navBar.classList.remove("main-nav--scrolled");
    }
  });
}

function setbodyContentWrapperTransformOrigin() {
  const bodyContentWrapper = document.querySelector(".body-content-wrapper");
  const currentScrollPos = window.pageYOffset;
  bodyContentWrapper.style.transformOrigin = `center ${currentScrollPos}px`;
}

function openHamburgerMenu() {
  const hamburgerMenuToggle = document.querySelector(".hamburger-menu-toggle");
  const navMenu = document.querySelector(".nav-bar__link-container");

  hamburgerMenuToggle.classList.add("hamburger-menu-toggle--cross");
  navMenu.classList.add("nav-bar__link-container--expanded");
  lockBodyScroll();
}
function closeHamburgerMenu() {
  const hamburgerMenuToggle = document.querySelector(".hamburger-menu-toggle");
  const navMenu = document.querySelector(".nav-bar__link-container");
  hamburgerMenuToggle.classList.remove("hamburger-menu-toggle--cross");

  navMenu.classList.remove("nav-bar__link-container--expanded");
  unlockBodyScroll();
}

function lockBodyScroll() {
  document.body.style.overflowY = "hidden";

  // set the transform origin to the center of teh screen
  setbodyContentWrapperTransformOrigin();
  document
    .querySelector(".body-content-wrapper")
    .classList.add("body-content-wrapper--dimmed");
}

function unlockBodyScroll() {
  document.body.style.overflowY = "scroll";

  // set the transform origin to the center of teh screen
  setbodyContentWrapperTransformOrigin();
  document
    .querySelector(".body-content-wrapper")
    .classList.remove("body-content-wrapper--dimmed");
}

// Trick adapted from the following link
// purpose is to stop the menu animation showing when window resizing
// https://css-tricks.com/stop-animations-during-window-resizing/
//
// Refer to _reset.css for the css component of this script
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

import { Card } from "./components/Card.js";
import {
  authBouquets,
  monoBouquets,
  caseBouquets,
  corfBouquets,
  strawberryBouquets,
} from "./utils/constants.js";

const submitBtn = document.querySelector(".button_type_buy");
const popup = document.querySelector(".popup");
const closeBtn = popup.querySelector(".button_type_close");
const header = document.querySelector(".header");
const toTopBtn = document.querySelector(".button_to_top");
const elementsListAuth = document.querySelector(".elements__list_type_auth");
const elementsListMono = document.querySelector(".elements__list_type_mono");
const elementsListCase = document.querySelector(".elements__list_type_case");
const elementsListCorf = document.querySelector(".elements__list_type_corf");
const elementsListStrawberry = document.querySelector(
  ".elements__list_type_strawberry"
);
const changeThemeButton = document.querySelector(".header__theme");
const formTitle = document.querySelector(".form__title");
const links = document.querySelectorAll(".menu__category-link");
const marginBlocks = document.querySelectorAll(".elements__margin-block");
const footerLinks = document.querySelectorAll(".footer__link");
let currentCardId;

function createCard(item, selector, functionName) {
  const card = new Card(item, selector, functionName);
  const cardElement = card.generateCard();
  return cardElement;
}

authBouquets.forEach((item) => {
  elementsListAuth.append(createCard(item, openPopup));
});

monoBouquets.forEach((item) => {
  elementsListMono.append(createCard(item, openPopup));
});

caseBouquets.forEach((item) => {
  elementsListCase.append(createCard(item, openPopup));
});

corfBouquets.forEach((item) => {
  elementsListCorf.append(createCard(item, openPopup));
});

strawberryBouquets.forEach((item) => {
  elementsListStrawberry.append(createCard(item, openPopup));
});

function openPopup(name, id) {
  formTitle.textContent = name;
  popup.classList.add("visible");
  currentCardId = id;
}

function closePopup() {
  popup.classList.remove("visible");
}

function handleEscClose(e) {
  if (e.key === "Escape") {
    closePopup();
  }
}

const submitForm = (e) => {
  e.preventDefault();
  alert("Покупка прошла успешно!");
  console.log(currentCardId);
  closePopup();
};

function toggleTheme(themeValue) {
  const styleLink = document.querySelector('[title="theme"]');
  let activeTheme = localStorage.getItem("theme");
  if (activeTheme === "light" || activeTheme === null) {
    styleLink.removeAttribute("href", "./style_light.css");
    styleLink.setAttribute("href", "./style_dark.css");
  } else if (themeValue === "dark") {
    styleLink.removeAttribute("href", "./style_dark.css");
    styleLink.setAttribute("href", "./style_light.css");
  }
}

function marginToggle(linksList, elementsList) {
  linksList.forEach((link) => {
    link.addEventListener("click", () => {
      const linkValue = link.href.substring(link.href.indexOf("#") + 1);
      elementsList.forEach((block) => {
        const id = block.getAttribute("id");
        if (block && linkValue === block.getAttribute("id")) {
          block.style = `height:${header.clientHeight - 30}px`;
          document.addEventListener(
            "wheel",
            (e) => {
              if (e.deltaY !== 0) {
                block.style = "height:0";
              }
            },
            { once: true }
          );
        } else {
          block.style = `height:0`;
        }
      });
    });
  });
}

marginToggle(links, marginBlocks);
marginToggle(footerLinks, marginBlocks);

toggleTheme(localStorage.getItem("theme"));

document.addEventListener("keydown", handleEscClose);

submitBtn.addEventListener("click", (e) => submitForm(e));

closeBtn.addEventListener("click", closePopup);

popup.addEventListener("mousedown", (e) => {
  if (e.target === popup) {
    closePopup(e);
  }
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  toTopBtn.classList.remove("visible");
});

changeThemeButton.addEventListener("click", (e) => {
  e.preventDefault();
  const styleLink = document.querySelector('[title="theme"]');
  let themeValue;
  if (styleLink.getAttribute("href") === "./style_light.css") {
    themeValue = "light";
  } else if (styleLink.getAttribute("href") === "./style_dark.css") {
    themeValue = "dark";
  }
  localStorage.setItem("theme", themeValue);
  toggleTheme(themeValue);
});

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 1) {
    header.classList.add("header_fixed");
    toTopBtn.classList.add("visible");
  } else {
    header.classList.remove("header_fixed");
    toTopBtn.classList.remove("visible");
  }
});

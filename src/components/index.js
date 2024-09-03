// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./cards.js";
import { cardInit, cardDelete, cardLike } from "./card.js";
import { closePopup, openPopup, openImagePopup, closePopupOverlay} from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const addImageButton = document.querySelector(".profile__add-button");
const closePopupButton = document.querySelectorAll(".popup__close");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddImage = document.querySelector(".popup_type_new-card");
const allPopups = document.querySelectorAll(".popup");

initialCards.forEach((cardInfo) => {
  cardsContainer.append(
    cardInit(cardTemplate, cardInfo, cardDelete, openImagePopup, cardLike)
  );
});

addImageButton.addEventListener("click", () => {
  openPopup(popupAddImage);
});

allPopups.forEach((item) => {
  item.addEventListener("click", (e) => {
    closePopupOverlay(item, e);
  });
});

closePopupButton.forEach((item) => {
  item.addEventListener("click", (e) => {
    closePopup(e.target.closest(".popup"));
  });
});

// Работа с формами

const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements["name"];
const descriptionInput = editProfileForm.elements["description"];
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.forms["new-place"];

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

function editProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
}

function addCardSubmit(e) {
  e.preventDefault();
  const cardInputInfo = {
    name: newPlaceForm.elements["place-name"].value,
    link: newPlaceForm.elements["link"].value,
  };
  cardsContainer.prepend(
    cardInit(cardTemplate, cardInputInfo, cardDelete, openImagePopup, cardLike)
  );
  newPlaceForm.reset();
  closePopup(popupAddImage);
}

newPlaceForm.addEventListener("submit", addCardSubmit);
editProfileForm.addEventListener("submit", editProfileSubmit);

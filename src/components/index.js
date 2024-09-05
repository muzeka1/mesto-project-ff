import "../index.css"; 
import { initialCards } from "./cards.js";
import {
  cardInit,
  cardDelete,
  cardLike,
} from "./card.js";
import { closePopup, openPopup, closePopupOverlay } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");
const addImageButton = document.querySelector(".profile__add-button");
const closePopupButtonList = document.querySelectorAll(".popup__close");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddImage = document.querySelector(".popup_type_new-card");
const allPopups = document.querySelectorAll(".popup");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements["name"];
const descriptionInput = editProfileForm.elements["description"];
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlaceForm = document.forms["new-place"];
const popupImageFullView = document.querySelector(".popup_type_image");
const imagePopupFullView = document.querySelector(".popup__image");
const captionPopupFullView = document.querySelector(".popup__caption")

function editProfileSubmit(formElement) {
  formElement.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
}

function addCardSubmit(formElement) {
  formElement.preventDefault();
  const cardInputInfo = {
    name: newPlaceForm.elements["place-name"].value,
    link: newPlaceForm.elements["link"].value,
  };
  cardsContainer.prepend(
    cardInit(
      cardTemplate,
      cardInputInfo,
      cardDelete,
      openImagePopupHandler,
      cardLike
    )
  );
  newPlaceForm.reset();
  closePopup(popupAddImage);
}

function openImagePopupHandler(cardInfo) {
  imagePopupFullView.src = cardInfo.link;
  imagePopupFullView.alt = cardInfo.name;
  captionPopupFullView.textContent = cardInfo.name;
  openPopup(popupImageFullView);
}

initialCards.forEach((cardInfo) => {
  cardsContainer.append(
    cardInit(
      cardTemplate,
      cardInfo,
      cardDelete,
      openImagePopupHandler,
      cardLike
    )
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

closePopupButtonList.forEach((item) => {
  item.addEventListener("click", (e) => {
    closePopup(e.target.closest(".popup"));
  });
});

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

newPlaceForm.addEventListener("submit", addCardSubmit);
editProfileForm.addEventListener("submit", editProfileSubmit);
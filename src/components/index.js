import "../index.css";
import { cardInit, cardLike } from "./card.js";
import { closePopup, openPopup, closePopupOverlay } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  updateUserInfo,
  postNewCard,
  getKeyData,
  updateUserLogoImage,
  cardDeleteRequest,
} from "./api.js";

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
const captionPopupFullView = document.querySelector(".popup__caption");
const profileImage = document.querySelector(".profile__image");
const popupEditProfileImage = document.querySelector(".popup_type_logo-url");
const editProfileImageForm = document.forms["edit-profile-logo"];
const logoInput = editProfileImageForm.elements["logo-link"];
const popupErrorMessage = document.querySelector(".popup_type_error-message");
const popupCardDelete = document.querySelector(".popup_type_card-delete");
const deleteCardForm = document.forms["delete-card"];
let cardIdToDelete = "";
let cardElementToDelete;

function editProfileSubmit(formElement) {
  formElement.preventDefault();
  const buttonElement = formElement.target.querySelector(".popup__button");
  popupButtonStateToggle(true, buttonElement);
  updateUserInfo(nameInput.value, descriptionInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = descriptionInput.value;
      closePopup(popupEditProfile);
    })
    .catch((errorMessage) => {
      openPopupErrorMessage(errorMessage);
    })
    .finally(() => {
      popupButtonStateToggle(false, buttonElement);
    });
}

function addCardSubmit(formElement, userData) {
  formElement.preventDefault();
  const buttonElement = formElement.target.querySelector(".popup__button");
  popupButtonStateToggle(true, buttonElement);
  postNewCard(
    newPlaceForm.elements["place-name"].value,
    newPlaceForm.elements["link"].value
  )
    .then((cardInfo) => {
      cardsContainer.prepend(
        cardInit(
          cardTemplate,
          cardInfo,
          openPopupDeleteCardHandler,
          openImagePopupHandler,
          cardLike,
          userData
        )
      );
      closePopup(popupAddImage);
    })
    .catch((errorMessage) => {
      openPopupErrorMessage(errorMessage);
    })
    .finally(() => {
      popupButtonStateToggle(false, buttonElement);
    });

  newPlaceForm.reset();
}

function openImagePopupHandler(cardInfo) {
  imagePopupFullView.src = cardInfo.link;
  imagePopupFullView.alt = cardInfo.name;
  captionPopupFullView.textContent = cardInfo.name;
  openPopup(popupImageFullView);
}

function openPopupDeleteCardHandler(cardId, cardElement) {
  cardIdToDelete = cardId;
  cardElementToDelete = cardElement;
  openPopup(popupCardDelete);
}

function deleteCardSubmit(formElement, cardIdToDelete, cardElementToDelete) {
  formElement.preventDefault();
  const buttonElement = formElement.target.querySelector(".popup__button");
  popupButtonStateToggle(true, buttonElement);
  cardDeleteRequest(cardIdToDelete)
    .then(() => {
      cardElementToDelete.remove();
      closePopup(popupCardDelete);
    })
    .catch((err) => {
      openPopupErrorMessage(err);
    })
    .finally(() => {
      popupButtonStateToggle(false, buttonElement);
    });
}

function renderUserInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
}

function editProfileImageSubmit(formElement) {
  formElement.preventDefault();
  const buttonElement = formElement.target.querySelector(".popup__button");
  popupButtonStateToggle(true, buttonElement);
  updateUserLogoImage(logoInput.value)
    .then((logoInfo) => {
      profileImage.style.backgroundImage = `url(${logoInfo.avatar})`;
      closePopup(popupEditProfileImage);
    })
    .catch((err) => {
      openPopupErrorMessage(err);
    })
    .finally(() => {
      popupButtonStateToggle(false, buttonElement);
    });
}

function popupButtonStateToggle(isLoading, popupButton) {
  if (isLoading) {
    popupButton.textContent = popupButton.dataset.requestText;
  } else {
    popupButton.textContent = popupButton.dataset.defaultText;
  }
}

function openPopupErrorMessage(errorMessage) {
  popupErrorMessage.textContent = errorMessage;
  popupErrorMessage.classList.add("popup_type_error-message-active");
  setTimeout(function () {
    popupErrorMessage.classList.remove("popup_type_error-message-active");
  }, 2500);
}

profileImage.addEventListener("click", () => {
  const inputList = Array.from(
    popupEditProfileImage.querySelectorAll(".popup__input")
  );
  inputList.forEach((input) => {
    input.value = "";
  });
  clearValidation(editProfileImageForm);
  openPopup(popupEditProfileImage);
});

addImageButton.addEventListener("click", () => {
  const inputList = Array.from(popupAddImage.querySelectorAll(".popup__input"));
  inputList.forEach((input) => {
    input.value = "";
  });
  clearValidation(newPlaceForm);
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
  clearValidation(editProfileForm);
  openPopup(popupEditProfile);
});

enableValidation();

getKeyData()
  .then(([userData, cardsDataArr]) => {
    renderUserInfo(userData);

    editProfileForm.addEventListener("submit", editProfileSubmit);

    editProfileImageForm.addEventListener("submit", editProfileImageSubmit);

    cardsDataArr.forEach((cardInfo) => {
      cardsContainer.append(
        cardInit(
          cardTemplate,
          cardInfo,
          openPopupDeleteCardHandler,
          openImagePopupHandler,
          cardLike,
          userData
        )
      );
    });

    newPlaceForm.addEventListener("submit", (evt) => {
      addCardSubmit(evt, userData);
    });

    deleteCardForm.addEventListener("submit", (evt) => {
      deleteCardSubmit(evt, cardIdToDelete, cardElementToDelete);
    });
  })
  .catch((err) => {
    openPopupErrorMessage(err);
  });
  
function openPopup(e) {
  e.classList.add("popup_is-opened");
  document.addEventListener("keydown", buttonCheck);
};

function closePopup(e) {
  e.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", buttonCheck);
};

function openImagePopup(cardInfo) {
  const cardImagePopup = document.querySelector(".popup_type_image");
  cardImagePopup.querySelector(".popup__image").src = cardInfo.link;
  cardImagePopup.querySelector(".popup__image").alt = cardInfo.name;
  cardImagePopup.querySelector(".popup__caption").textContent = cardInfo.name;
  cardImagePopup.classList.add("popup_is-opened");
  document.addEventListener("keydown", buttonCheck);
};

function buttonCheck(btn) {
  if (btn.key === "Escape") {
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
    document.removeEventListener("keydown", buttonCheck);
  }
};

function closePopupOverlay(item, e) {
  if (e.target === item) {
    closePopup(e.target);
  }
}

export { openPopup, closePopup, openImagePopup, closePopupOverlay};

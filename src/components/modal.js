function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", buttonCheck);
};

function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", buttonCheck);
};

function buttonCheck(evt) {
  const popupElement = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closePopup(popupElement)
  }
};

function closePopupOverlay(item, evt) {
  if (evt.target === item) {
    closePopup(evt.target);
  }
}

export { openPopup, closePopup, closePopupOverlay};

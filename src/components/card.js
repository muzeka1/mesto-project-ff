function cardInit(
  cardTemplate,
  cardInfo,
  cardDelete,
  openPopup,
  openImagePopupHandler,
  popupImageFullView,
  cardLike
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardElement.querySelector(".card__title").textContent = cardInfo.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", cardDelete);

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", () =>
      openImagePopupHandler(cardInfo, popupImageFullView, openPopup)
    );

  cardElement.addEventListener("click", cardLike);

  return cardElement;
}

function cardDelete(el) {
  el.target.closest(".places__item").remove();
}

function cardLike(el) {
  if (el.target.classList.contains("card__like-button")) {
    el.target.classList.toggle("card__like-button_is-active");
  }
}

function openImagePopupHandler(cardInfo, popupElement, openPopup) {
  const popupImage = popupElement.querySelector(".popup__image");
  popupImage.src = cardInfo.link;
  popupImage.alt = cardInfo.name;
  popupElement.querySelector(".popup__caption").textContent = cardInfo.name;
  openPopup(popupElement);
}

export { cardInit, cardDelete, cardLike, openImagePopupHandler};

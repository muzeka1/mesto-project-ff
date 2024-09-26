import { cardPutLikeRequest, cardRemoveLikeRequest } from "./api.js";

function cardInit(
  cardTemplate,
  cardInfo,
  openPopupDeleteCardHandler,
  openImagePopupHandler,
  cardLike,
  ownerInfo
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardElement.querySelector(".card__title").textContent = cardInfo.name;

  // Проверка на владельца и удаление карточки
  if (ownerInfo._id !== cardInfo.owner._id) {
    cardDeleteButton.style.display = "none";
  } else {
    cardDeleteButton.addEventListener("click", (e) => {
      openPopupDeleteCardHandler(
        cardInfo._id,
        e.target.closest(".places__item")
      );
    });
  }

  // Открытие по клику на изображение
  cardImage.addEventListener("click", () => openImagePopupHandler(cardInfo));

  // Проверка на наличие лайка
  if (
    cardInfo.likes.some((e) => {
      return e._id === ownerInfo._id;
    })
  ) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  // Количество лайков на карточке после загрузки с сервера
  cardLikeNumber.textContent = cardInfo.likes.length;

  // Постановка и удаление лайка
  cardLikeButton.addEventListener("click", () => {
    cardLike(cardLikeButton, cardLikeNumber, cardInfo, ownerInfo);
  });

  return cardElement;
}

function cardLike(cardLikeButton, cardLikeNumber, cardInfo, ownerInfo) {
  if (!cardLikeButton.classList.contains("card__like-button_is-active")) {
    cardPutLikeRequest(cardInfo._id).then((updatedCardInfo) => {
      cardLikeNumber.textContent = updatedCardInfo.likes.length;
      cardLikeButton.classList.add("card__like-button_is-active");
    });
  } else {
    cardRemoveLikeRequest(cardInfo._id).then((updatedCardInfo) => {
      cardLikeNumber.textContent = updatedCardInfo.likes.length;
      cardLikeButton.classList.remove("card__like-button_is-active");
    });
  }
}

export { cardInit, cardLike };

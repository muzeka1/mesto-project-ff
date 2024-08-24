// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css'; // добавьте импорт главного файла стилей
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
import {initialCards} from './cards.js';

function cardInit(cardInfo) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = cardInfo.name;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {cardDelete(cardElement)})
    return cardElement
}

function cardDelete(cardElement) {
    cardElement.remove()
}

initialCards.forEach(cardInfo => {
    cardsContainer.append(cardInit(cardInfo));
})
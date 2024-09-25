const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-23",
  headers: {
    authorization: "364ca4dc-eb54-4d9d-8c6a-9a3b62c6df46",
    "Content-Type": "application/json",
  },
};

const keyData = [getUserData(), getInitialCards()];

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось загрузить карточки: ${res.status}`);
    })
}

function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res;
      }

      return Promise.reject(`Не удалось обновить данные пользователя: ${res.status}`);
    })
}

function updateUserLogoImage(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Не удалось обновить аватар пользователя: ${res.status}`);
    })
}

function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Не удалось получить данные пользователя: ${res.status}`);
    })
}

function postNewCard(placeName, imageUrl) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: imageUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Не удалось добавить карточку: ${res.status}`);
    })
}

function cardDeleteRequest(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Не удалось удалить карточку: ${res.status}`);
    })
}

function cardPutLikeRequest(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Не удалось поставить лайк: ${res.status}`);
    })
}

function cardRemoveLikeRequest(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось убрать лайк: ${res.status}`);
    })
}

function getKeyData() {
  return Promise.all(keyData)
    .then((data) => {
      return [data[0], data[1]];
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export {
  getInitialCards,
  updateUserInfo,
  getUserData,
  postNewCard,
  cardDeleteRequest,
  cardPutLikeRequest,
  cardRemoveLikeRequest,
  getKeyData,
  updateUserLogoImage,
};

// Токен: 516b48a6-c50b-43c5-aac7-85b1d4cfb698
// Идентификатор группы: plus-cohort-4
//
const fetchInit = {
  url: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: '516b48a6-c50b-43c5-aac7-85b1d4cfb698',
  },
};

function getResponseResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

function getCards() {
  return fetch(`${fetchInit.url}/cards`, {
    headers: fetchInit.headers,
  }).then(getResponseResult);
}

function getProfile() {
  return fetch(`${fetchInit.url}/users/me`, {
    headers: fetchInit.headers,
  }).then(getResponseResult);
}

// Создаём массив с промисами
const promises = [getProfile(), getCards()];

export { getCards, getProfile, promises };

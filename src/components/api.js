const fetchInit = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: '516b48a6-c50b-43c5-aac7-85b1d4cfb698',
    'Content-Type': 'application/json',
  },
};

function getResponseResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function getErrorResponse(err) {
  return console.log(err);
}

function getCards() {
  return fetch(`${fetchInit.baseUrl}/cards`, {
    headers: fetchInit.headers,
  })
    .then(getResponseResult)
    .catch(getErrorResponse);
}

function getProfile() {
  return fetch(`${fetchInit.baseUrl}/users/me`, {
    headers: fetchInit.headers,
  })
    .then(getResponseResult)
    .catch(getErrorResponse);
}

function pushProfileData(data) {
  return fetch(`${fetchInit.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: fetchInit.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  })
    .then(getResponseResult)
    .catch(getErrorResponse);
}

const promisesData = [getProfile(), getCards()];

export { promisesData, pushProfileData };

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
  }).then(getResponseResult);
}

function getProfile() {
  return fetch(`${fetchInit.baseUrl}/users/me`, {
    headers: fetchInit.headers,
  }).then(getResponseResult);
}

function pushProfileData(data) {
  return fetch(`${fetchInit.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: fetchInit.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then(getResponseResult);
}

// function pushCardData(data) {
//   return fetch(`${fetchInit.baseUrl}/cards`, {
//     method: 'POST',
//     headers: fetchInit.headers,
//     body: JSON.stringify({
//       name: data.name,
//       link: data.link,
//     }),
//   }).then(getResponseResult);
// }

function pushLikeData(id) {
  return fetch(`${fetchInit.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: fetchInit.headers,
  }).then(getResponseResult);
}

function deleteLikeData(id) {
  return fetch(`${fetchInit.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: fetchInit.headers,
  }).then(getResponseResult);
}

function deleteCard(id) {
  return fetch(`${fetchInit.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: fetchInit.headers,
  }).then(getResponseResult);
}

function updateProfileAvatar(data) {
  return fetch(`${fetchInit.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: fetchInit.headers,
    body: JSON.stringify({ avatar: data }),
  }).then(getResponseResult);
}

const promisesData = [getProfile(), getCards()];


class Api {
  constructor(options) {
    // тело конструктора
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  // function getErrorResponse(err) {
  //   return console.log(err);
  // }
  
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseResult);
  }
  
  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseResult);
  }
  
  pushProfileData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseResult);
  }
  
  pushCardData(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then(this._getResponseResult);
  }
  
  pushLikeData(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._getResponseResult);
  }
  
  deleteLikeData(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseResult);
  }
  
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponseResult);
  }
  
  updateProfileAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: data }),
    }).then(this._getResponseResult);
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-4',
  headers: {
    authorization: '516b48a6-c50b-43c5-aac7-85b1d4cfb698',
    'Content-Type': 'application/json'
  }
});


export {
  promisesData,
  getErrorResponse,
  pushProfileData,
  deleteCard,
  pushLikeData,
  deleteLikeData,
  updateProfileAvatar,
  api
};
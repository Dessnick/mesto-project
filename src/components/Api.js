export default class Api {
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

  getErrorResponse(err) {
    return console.log(err);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseResult);
  }

  _connectionTemplate(url, method, body) {
    return fetch(`${this._baseUrl}/${url}`, {
      method: method,
      headers: this._headers,
      body: body,
    }).then(this._getResponseResult);
  }

  getProfile() {
    return this._connectionTemplate('users/me', 'GET');
  }

  pushProfileData(data) {
    return this._connectionTemplate(
      'users/me',
      'PATCH',
      JSON.stringify({
        name: data.name,
        link: data.about,
      }),
    );
  }

  pushCardData(data) {
    return this._connectionTemplate(
      'cards',
      'POST',
      JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    );
  }

  pushLikeData(id) {
    return this._connectionTemplate(`cards/likes/${id}`, 'PUT');
  }

  deleteLikeData(id) {
    return this._connectionTemplate(`cards/likes/${id}`, 'DELETE');
  }

  deleteCard(id) {
    return this._connectionTemplate(`cards/${id}`, 'DELETE');
  }

  updateProfileAvatar(data) {
    return this._connectionTemplate('users/me/avatar', 'PATCH', JSON.stringify({ avatar: data }));
  }
}

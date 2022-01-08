import {
  api
} from './Api.js';
import {renderProfileInfo} from '../pages/index.js';

export default class UserInfo {
  constructor({ loginSelector, aboutSelector }) {
    this._login = document.querySelector(loginSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    api.getProfile()
    .then((result) => {
      renderProfileInfo(result);
    })
    .catch(api.getErrorResponse)
  }

  setUserInfo({ name, about }, saveButtonProfileEdit) {
    api
      .pushProfileData({ name, about })
      .then((res) => {
        this._login.textContent = res.name;
        this._about.textContent = res.about;
        return res;
      })
      .catch(api.getErrorResponse)
      .finally(() => (saveButtonProfileEdit.textContent = 'Сохранить'));
  }
}

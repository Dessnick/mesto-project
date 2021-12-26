class UserInfo {
  constructor({ loginSelector, aboutSelector }) {
    this._login = document.querySelector(loginSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return this.userData;
  }

  setUserInfo({ name, about }) {
    this._login = name;
    this._about = about;
  }
}

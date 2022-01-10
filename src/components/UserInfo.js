export default class UserInfo {
  constructor(userData, userInfoClassList) {
    const { name, about, avatar, _id } = userData;
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;

    this._loginElement = document.querySelector(userInfoClassList.profileName);
    this._aboutElement = document.querySelector(userInfoClassList.profileAbout);
    this._avatarElement = document.querySelector(userInfoClassList.profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
      _id: this._id,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._loginElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}

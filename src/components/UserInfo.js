export class UserInfo {
  constructor(profileNameElement, profileTitleElement, profilePicture) {
    this._profileNameElement = profileNameElement;
    this._profileTitleElement = profileTitleElement;
    this._profilePicture = profilePicture;
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      title: this._profileTitleElement.textContent
    }
  }

  setUserInfo({name, about, avatar}) {
    this._profileNameElement.textContent = name;
    this._profileTitleElement.textContent = about;
    this._profilePicture.src = avatar;
  }
}

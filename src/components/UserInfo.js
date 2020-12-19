export class UserInfo {
  constructor(profileNameElement, profileTitleElement) {
    this._profileNameElement = profileNameElement;
    this._profileTitleElement = profileTitleElement;
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      title: this._profileTitleElement.textContent
    }
  }

  setUserInfo({profileName, profileTitle}) {
    this._profileNameElement.textContent = profileName;
    this._profileTitleElement.textContent = profileTitle;
  }
}

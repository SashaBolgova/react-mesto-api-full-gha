
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json()
        .then((err) => {
          throw new Error(err.message);
        })
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._checkAnswer(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    })
      .then(res => this._checkAnswer(res));
  }

  changeUserInfo({ name, profession }) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: profession
      }),
    })
      .then(res => this._checkAnswer(res));
  }

  addMyCard({ place, image }) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: image
      }),
    })
      .then(res => this._checkAnswer(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkAnswer(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._checkAnswer(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkAnswer(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
    })
      .then(res => this._checkAnswer(res));
  }

}

export const api = new Api({
  baseUrl: 'https://api.sashaproject.nomoredomains.monster',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  }
}); 

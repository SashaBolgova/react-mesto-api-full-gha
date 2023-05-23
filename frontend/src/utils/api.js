
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;

    const token = localStorage.getItem("jwt")
    if (token)
      this.setAuthToken(token);
  }
  _checkAnswer(res) {
    if (res.ok) {
      return (res.json());
    } else {
      return res.json()
        .then((err) => {
          throw new Error(err.message);
        })
    }
  }

  setAuthToken (token) {
    this._headers.Authorization = `Bearer ${token}`;
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkAnswer(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkAnswer(res));
  }

  changeUserInfo({ name, profession }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: profession
      }),
      credentials: 'include',
    })
      .then(res => this._checkAnswer(res));
  }

  addMyCard({ place, image }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: image
      }),
      credentials: 'include',
    })
      .then(res => this._checkAnswer(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkAnswer(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    })
      .then(res => this._checkAnswer(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
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
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
      credentials: 'include',
    })
      .then(res => this._checkAnswer(res));
  }

}

export const api = new Api({
  baseUrl: 'https://api.sashaproject.nomoredomains.monster/',
  headers: {
    'Content-Type': 'application/json',
  }
}); 

export const BASE_URL = 'https://api.sashaproject.nomoredomains.monster';

const checkAnswer = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json()
      .then((err) => {
        throw new Error(err.message);
      })
  }
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })
    .then(checkAnswer)
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })
    .then(checkAnswer)
}

export const cookiesCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
    .then(checkAnswer)
}
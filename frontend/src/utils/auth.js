export const BASE_URL = 'https://sashaproject.nomoredomains.monster';

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

export const register = ({ email, password }) => {
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

export const authorize = ({ email, password }) => {
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

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(checkAnswer)
};

export const cookiesCheck = () => {
  return fetch(`${BASE_URL}/check`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(checkAnswer)
}
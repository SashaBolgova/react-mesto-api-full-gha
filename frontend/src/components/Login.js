import { useState } from 'react';
import './Login.css'

const Login = ({ onLogin }) => {
  const [message, setMessage] = useState('');

  const [inputs, setInput] = useState({
    email: '',
    password: '',
  });

  const handleChangeName = (e) => {
    const email = e.target.value;
    setInput({
      ...inputs,
      email,
    });
  }

  const handleChangePassword = (e) => {
    const password = e.target.value;
    setInput({
      ...inputs,
      password,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
      return false
        .then(() => setMessage(""))
    }
    onLogin(inputs);

    setInput({
      email: '',
      password: '',
    })
  
}

return (
  <div className='login'>
    <h2 className='login__header'>Вход</h2>
    <form className='login__form' onSubmit={handleSubmit}>
      <input
        className='login__input'
        id='email'
        name='email'
        type="email"
        required
        value={inputs.email}
        placeholder='Email'
        onChange={handleChangeName}
      />
      <input
        className='login__input'
        id='password'
        name='password'
        type="password"
        required
        value={inputs.password}
        placeholder='Пароль'
        onChange={handleChangePassword}
      />
      <button type="submit" className='login__button'>Войти</button>
    </form>
  </div>
)
}

export default Login
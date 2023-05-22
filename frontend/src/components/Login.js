import { useState } from 'react';
import './Login.css'

const Login = ({onLogin}) => {
    const [inputs, setInput] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const {name, value} = e.target;
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
     
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = inputs

        if (onLogin && email && password) {
          onLogin(email, password)
        }
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
                    onChange={handleChange}
                />
                <input
                    className='login__input'
                    id='password'
                    name='password'
                    type="password"
                    required
                    value={inputs.password}
                    placeholder='Пароль'
                    onChange={handleChange}
                />
                <button type="submit" className='login__button'>Войти</button>
        </form>
    </div>
)
}

export default Login
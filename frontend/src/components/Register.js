import { useState } from 'react';
import './Register.css'

const Register = ({ onRegister }) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const { email, password } = formValue;
        if (onRegister && email && password) {
            onRegister(email, password);
        }
    }
    return (
        <div className='registration'>
            <h2 className='registration__header'>Регистрация</h2>
            <form className='registration__form' onSubmit={handleSubmit}>
                <input
                    className='registration__input'
                    id='email'
                    name='email'
                    type="email"
                    required
                    value={formValue.email}
                    placeholder='Email'
                    onChange={handleChange}
                />
                <input
                    className='registration__input'
                    id='password'
                    name='password'
                    type="password"
                    required
                    value={formValue.password}
                    placeholder='Пароль'
                    onChange={handleChange}
                />
                <button type="submit" className='registration__button'>Зарегистрироваться</button>
                <p className='registration__text'>Уже зарегистрированы?
                    <a className='registration__link' href='/react-mesto-auth/sign-in'> Войти</a>
                </p>
            </form>
        </div>
    )

    } 
export default Register;
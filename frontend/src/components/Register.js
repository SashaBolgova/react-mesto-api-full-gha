import { useState } from 'react';
import './Register.css'

const Register = ({ onRegister }) => {
    const [message, setMessage] = useState('');
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChangeEmail = (e) => {
        const email = e.target.value;

        setFormValue({
            ...formValue,
            email,
        });
    }

    function handleChangePassword(e) {
        const password = e.target.value;

        setFormValue({
            ...formValue,
            password,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValue.email || !formValue.password) {
            return setMessage('Неверные данные')
        }
        onRegister(formValue);

        setFormValue({
            email: "",
            password: ""
        })

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
                    onChange={handleChangeEmail}
                />
                <input
                    className='registration__input'
                    id='password'
                    name='password'
                    type="password"
                    required
                    value={formValue.password}
                    placeholder='Пароль'
                    onChange={handleChangePassword}
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
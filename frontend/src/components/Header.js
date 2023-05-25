import React from 'react';
import headerLogo from '../images/header-logo.svg'
import './Header.css'
import { Routes, Route, Link } from "react-router-dom";

function Header({ onSignOut, email }) {

    return (
        <header className={`header && 'header_visible'`}>
        <img src={headerLogo} alt="Слова: место, Россия - на английском" className="header__logo" />
        <Routes>
            <Route
                path="/sign-in"
                element={
                    <Link className="header__link" to="/sign-up">
                        Регистрация
                    </Link>
                }
            />
            <Route
                path="sign-up"
                element={
                    <Link className="header__link" to="/sign-in">
                        Войти
                    </Link>
                }
            />
            <Route
                path="/"
                element={
                    <>
                        <div className={`header__wrapper && 'header__wrapper_visible'`}>
                            <p className="header__email">{email}</p>
                            <button
                                className="header__button-exit"
                                onClick={onSignOut}
                                type="button"
                            >
                                Выйти
                            </button>
                        </div>
                    </>
                }
            />
        </Routes>
    </header>
    );
}
export default Header;


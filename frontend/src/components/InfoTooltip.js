import React from 'react';
import './InfoTooltip.css'
import checkIcon from '../images/check.svg'
import errorIcon from '../images/error.svg'

function InfoTooltip({ isOpen, isSuccess, onClose }) {
    const text = `${isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__block">
                <button
                    onClick={onClose}
                    type="button" className="popup__toggle" aria-label="Закрытие попапа"></button>
                <div className="popup__container">
                    <img className='popup__icon'
                    src={isSuccess ? checkIcon : errorIcon}
                    alt='Иконка'
                    />
                    <p className="popup__message">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;
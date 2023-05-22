import React from 'react';
import './PopupWithForm.css'


function PopupWithForm({ name, title, isOpen, children, buttonTitle, onClose, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__block">
                <button
                    onClick={onClose}
                    type="button" className="popup__toggle" aria-label="Закрытие попапа"></button>
                <div className="popup__container">
                    <h2 className="popup__title">{title}</h2>
                    <form onSubmit={onSubmit} name="popup-card__form" className="popup__form">
                        {children}
                        <button type="submit" className="popup__button">{buttonTitle}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default PopupWithForm;
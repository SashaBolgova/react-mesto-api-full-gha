import React from 'react';
import './PopupWithForm.css'

function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup_image ${card ? "popup_opened" : ""}`} id="popup-image">
            <div className="popup__block">
                <button
                    onClick={onClose}
                    type="button" className="popup__toggle" aria-label="Закрытие попапа"></button>
                <figure className="popup__image">
                    <img
                        src={card?.link} alt={card?.name}
                        className="popup__image-large"
                    />
                    <figcaption className="popup__image-title">{card?.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}
export default ImagePopup;
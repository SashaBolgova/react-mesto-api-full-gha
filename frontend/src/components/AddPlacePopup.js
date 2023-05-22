import React, { useState, useEffect } from 'react';
import './PopupWithForm.css'
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function changeCardName(evt) {
        setName(evt.target.value)
    }

    function changeCardLink(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            place: name,
            image: link
        })
    }

    useEffect(() => {
        if (!isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            name="card"
            title="Новое место"
            buttonTitle="Создать"
            onSubmit={handleSubmit}
        >
            <input
                id="place-card"
                onChange={changeCardName}
                value={name}
                type="text"
                name="place"
                className="popup__input popup__input_type_place"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30" />
            <span className="place-card-error popup__error popup__error_visible"></span>
            <input
                id="image-card"
                onChange={changeCardLink}
                value={link}
                type="url"
                name="image"
                className="popup__input popup__input_type_image"
                placeholder="Ссылка на картинку"
                required />
            <span className="image-card-error popup__error popup__error_visible"></span>
        </PopupWithForm>
    )
}
export default AddPlacePopup;

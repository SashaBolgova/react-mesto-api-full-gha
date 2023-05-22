import React, { useContext, useRef, useEffect } from 'react';
import './PopupWithForm.css'
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const currentUser = useContext(CurrentUserContext);
    const avatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = '';
    }, [currentUser, isOpen])

    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            name="profile"
            title="Обновить аватар"
            buttonTitle="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                id="avatar-profile"
                type="url"
                ref={avatarRef}
                name="avatar"
                className="popup__input popup__input_type_avatar"
                placeholder="Ссылка на аватар"
                required />
            <span className="avatar-profile-error popup__error popup__error_visible"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;

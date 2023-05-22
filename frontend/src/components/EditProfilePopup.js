import React, { useContext, useState, useEffect } from 'react';
import './PopupWithForm.css'
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      profession: description
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="name-profile"
        onChange={handleChangeName}
        value={ name }
        type="text"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40" />
      <span className="name-profile-error popup__error popup__error_visible"></span>
      <input
        id="profession-profile"
        onChange={handleChangeDescription}
        value={ description }
        type="text"
        name="profession"
        className="popup__input popup__input_type_profession"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200" />
      <span className="profession-profile-error popup__error popup__error_visible"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;

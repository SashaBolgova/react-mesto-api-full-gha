import './Main.css'
import React, { useContext } from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ handleEditProfileClick, handleAddPlaceClick, handleEditAvatarClick, handleCardClick, handleLikeClick, handleDeleteClick, cards }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__data">
                    <button
                        onClick={handleEditAvatarClick}
                        className="profile__avatar-edit" aria-label="Открытие попапа аватара">
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            onClick={handleEditProfileClick}
                            type="button" className="profile__edit" aria-label="Открытие попапа профиля"></button>
                        <p className="profile__profession">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    onClick={handleAddPlaceClick}
                    type="button" className="profile__add-card" aria-label="Открытие попапа карточек"></button>
            </section>
            <section className="elements" aria-label="Места России">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={handleCardClick}
                        onCardLike={handleLikeClick}
                        onCardDelete={handleDeleteClick}
                    />
                ))}
            </section>
        </main>
    );
}
export default Main;
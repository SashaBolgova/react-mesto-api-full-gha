import React, { useContext } from 'react';
import './Card.css'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <article className="element">
            {isOwn && <button type="button" className='element__button-delete' aria-label="Удаление карточки" onClick={handleDeleteClick} />}
            <img
                onClick={handleClick}
                className="element__image" alt={card.name} src={card.link} />
            <div className="element__group">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like">
                    <button type="button" className={cardLikeButtonClassName} aria-label="Лайк карточки" onClick={handleLikeClick}></button>
                    <h3 className="element__like-counter">{card.likes.length}</h3>
                </div>
            </div>
        </article>
    )
}
export default Card;

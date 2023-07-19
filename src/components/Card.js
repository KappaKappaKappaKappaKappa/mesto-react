import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick }) {

    const currentUserContext = React.useContext(CurrentUserContext);
    const isOwner = card.owner._id === currentUserContext._id;
    const isLiked = card.likes.some(i => i._id === currentUserContext._id);
    const cardLikeButtonClassName = ( 
        `card__like ${isLiked && 'card__like_active'}` 
      );; 


    const handleClick = () => {
        onCardClick(card);
    };

    return (
        <li className="cards__list-card" key={card._id}>
            <article className="card">
                {isOwner && <button className="card__trash" type="button"></button>}
                <div className="card__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
                <div className="card__info">
                    <h2 className="card__place">{card.name}</h2>
                    <div className="card__like-container">
                        <button className={cardLikeButtonClassName} type="button"></button>
                        <span className="card__like-numbers">{card.likes.length}</span>
                    </div>
                </div>
            </article>
        </li>
    )
}

export default Card;
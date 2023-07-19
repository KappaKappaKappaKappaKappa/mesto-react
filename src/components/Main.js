import React, { useState, useEffect } from 'react';
import api from "../utils/api.js";
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const currentUserContext = React.useContext(CurrentUserContext)

    const [cards, setCards] = useState([])

    useEffect(() => {
        api.getCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <main className="content">

            <section className="profile">
                <button className="profile__avatar-btn" onClick={onEditAvatar}>
                    <div className="profile__avatar" style={{ backgroundImage: `url(${currentUserContext && currentUserContext.avatar ? currentUserContext.avatar : ''})` }}></div>
                </button>
                <div className="profile-info">
                    <div className="profile-info__container">
                        <h1 className="profile-info__name">{currentUserContext && currentUserContext.name ? currentUserContext.name : ''}</h1>
                        <button className="profile-info__edit-button" type="button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile-info__profession">{currentUserContext && currentUserContext.about ? currentUserContext.about : ''}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="cards">
                <ul className="cards__list">
                    {cards.map((card) => {
                        return (
                            <Card card={card} onCardClick={onCardClick} key={card._id} ></Card>
                        )
                    })}
                </ul>
            </section>

        </main >
    )
}

export default Main
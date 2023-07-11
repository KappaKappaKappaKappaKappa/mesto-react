import React, { useState, useEffect } from 'react';
import api from "../utils/api.js";
import Card from './Card.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([])

    useEffect(() => {
        api.getInfo()
            .then((userData) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

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
                    <img className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} />
                </button>
                <div className="profile-info">
                    <div className="profile-info__container">
                        <h1 className="profile-info__name">{userName}</h1>
                        <button className="profile-info__edit-button" type="button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile-info__profession">{userDescription}</p>
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
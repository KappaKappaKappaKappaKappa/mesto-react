import React, { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

    const [currentUser, setCurrentUser] = useState(null)

    React.useEffect(() => {
        api.getInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    
    const [cards, setCards] = useState([])

    React.useEffect(() => {
        api.getCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard(null);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    cards={cards}
                />

                <PopupWithForm title='Редактировать профиль' name='edit-profile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} textBtnSave='Сохранить'>
                    <input className="pop-up__form-input pop-up__form-input_input_name" id='name-input' name="username"
                        type="text" required minLength="2" maxLength="40" placeholder="Укажите имя" />
                    <span className="pop-up__form-input-error pop-up__form-name-input-error"></span>
                    <input className="pop-up__form-input pop-up__form-input_input_profession" id='profession-input'
                        name="profession" type="text" required minLength="2" maxLength="200"
                        placeholder="Укажите чем вы занимаетесь" />
                    <span className="pop-up__form-input-error pop-up__form-profession-input-error"></span>
                </PopupWithForm>

                <PopupWithForm title='Новое место' name='add-cards' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} textBtnSave='Создать'>
                    <input className="pop-up__form-input pop-up__form-input_input_place" id="place-input" name="title"
                        type="text" placeholder="Название" required minLength="2" maxLength="30" />
                    <span className="pop-up__form-input-error pop-up__form-place-input-error"></span>
                    <input className="pop-up__form-input pop-up__form-input_input_link" id="link-input" name="link" type="url"
                        placeholder="Ссылка на картинку" required />
                    <span className="pop-up__form-input-error pop-up__form-link-input-error"></span>
                </PopupWithForm>


                <PopupWithForm title='Вы уверены?' name='delete-submit' textBtnSave='Да'>
                </PopupWithForm>

                <PopupWithForm title='Обновить аватар' name='new-avatar-form' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} textBtnSave='Сохранить'>
                    <input className="pop-up__form-input pop-up__form-input_input_avatar-url" id="avatar-url-input"
                        name="avatar" type="url" placeholder="Ссылка на новый аватар" required />
                    <span className="pop-up__form-input-error pop-up__form-avatar-url-input-error"></span>
                </PopupWithForm>

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <Footer />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

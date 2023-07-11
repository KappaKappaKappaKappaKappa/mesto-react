import React, { useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

    const [selectedCard, setSelectedCard] = useState(null);

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
        <div className="body">
            <div className="App">
                <Header />
                <Main
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onEditAvatar = {handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />

                <PopupWithForm title='Редактировать профиль' name='edit-profile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                    <input className="pop-up__form-input pop-up__form-input_input_name" id='name-input' name="username"
                        type="text" required minLength="2" maxLength="40" placeholder="Укажите имя" />
                    <span className="pop-up__form-input-error pop-up__form-name-input-error"></span>
                    <input className="pop-up__form-input pop-up__form-input_input_profession" id='profession-input'
                        name="profession" type="text" required minLength="2" maxLength="200"
                        placeholder="Укажите чем вы занимаетесь" />
                    <span className="pop-up__form-input-error pop-up__form-profession-input-error"></span>
                </PopupWithForm>

                <PopupWithForm title='Новое место' name='add-cards' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                    <input className="pop-up__form-input pop-up__form-input_input_place" id="place-input" name="title"
                        type="text" placeholder="Название" required minLength="2" maxLength="30" />
                    <span className="pop-up__form-input-error pop-up__form-place-input-error"></span>
                    <input className="pop-up__form-input pop-up__form-input_input_link" id="link-input" name="link" type="url"
                        placeholder="Ссылка на картинку" required />
                    <span className="pop-up__form-input-error pop-up__form-link-input-error"></span>
                </PopupWithForm>


                <PopupWithForm title='Вы уверены?' name='delete-submit'>
                    <button className="pop-up__form-button-save">Да</button>
                </PopupWithForm>

                <PopupWithForm title='Обновить аватар' name='new-avatar-form' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                    <input className="pop-up__form-input pop-up__form-input_input_avatar-url" id="avatar-url-input"
                        name="avatar" type="url" placeholder="Ссылка на новый аватар" required />
                    <span className="pop-up__form-input-error pop-up__form-avatar-url-input-error"></span>
                </PopupWithForm>

                <ImagePopup
                card = {selectedCard}
                onClose = {closeAllPopups}
                 />

                <Footer />
            </div>
        </div>
    );
}

export default App;

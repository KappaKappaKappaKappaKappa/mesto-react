import React, { useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    return (
        <body class="body">
            <div className="App">
                <Header />
                <Main
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onEditAvatar = {handleEditAvatarClick}
                    isEditProfilePopupOpen={isEditProfilePopupOpen}
                    isAddPlacePopupOpen={isAddPlacePopupOpen}
                    isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                />

                <PopupWithForm title='Редактировать профиль' name='edit-profile'>
                    <input className="pop-up__form-input pop-up__form-input_input_name" id='name-input' name="username"
                        type="text" required minlength="2" maxlength="40" placeholder="Укажите имя" />
                    <span className="pop-up__form-input-error pop-up__form-name-input-error"></span>
                    <input className="pop-up__form-input pop-up__form-input_input_profession" id='profession-input'
                        name="profession" type="text" required minlength="2" maxlength="200"
                        placeholder="Укажите чем вы занимаетесь" />
                    <span className="pop-up__form-input-error pop-up__form-profession-input-error"></span>
                </PopupWithForm>

                <PopupWithForm title='Новое место' name='add-cards'>
                    <input className="pop-up__form-input pop-up__form-input_input_place" id="place-input" name="title"
                        type="text" placeholder="Название" required minlength="2" maxlength="30" />
                    <span className="pop-up__form-input-error pop-up__form-place-input-error"></span>
                    <input className="pop-up__form-input pop-up__form-input_input_link" id="link-input" name="link" type="url"
                        placeholder="Ссылка на картинку" required />
                    <span className="pop-up__form-input-error pop-up__form-link-input-error"></span>
                </PopupWithForm>


                <PopupWithForm title='Вы уверены?' name='delete-submit'>
                    <button className="pop-up__form-button-save">Да</button>
                </PopupWithForm>

                <PopupWithForm title='Обновить аватар' name='new-avatar-form'>
                    <input className="pop-up__form-input pop-up__form-input_input_avatar-url" id="avatar-url-input"
                        name="avatar" type="url" placeholder="Ссылка на новый аватар" required />
                    <span className="pop-up__form-input-error pop-up__form-avatar-url-input-error"></span>
                </PopupWithForm>

                <ImagePopup />

                <template className="card-template">
                    <li className="cards__list-card">
                        <article className="card">
                            <button className="card__trash" type="button"></button>
                            <img className="card__image" src="#" alt="#" />
                            <div className="card__info">
                                <h2 className="card__place"></h2>
                                <div className="card__like-container">
                                    <button className="card__like" type="button"></button>
                                    <span className="card__like-numbers"></span>
                                </div>
                            </div>
                        </article>
                    </li>
                </template>
                <Footer />
            </div>
        </body>
    );
}

export default App;

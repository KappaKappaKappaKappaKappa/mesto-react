import React, { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup'

function App() {
    //Создание стейт-переменных открытия-закрытия popup'ов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)

    //Создание стейта текущего пользователя
    const [currentUser, setCurrentUser] = useState(null)

    //Получение данных текущего пользователя
    React.useEffect(() => {
        api.getInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    //Создание стейта карточек
    const [cards, setCards] = useState([])

    //Получение карточек
    React.useEffect(() => {
        api.getCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    
    //Создание стейта выбранной карточки
    const [selectedCard, setSelectedCard] = useState(null);


    const handleCardLike = (card) => {
        //Проверка наличия лайка на карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        //Запрос обновленных данных карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                const updateCards = cards.filter((c) => c._id !== card._id);
                setCards(updateCards);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Функция обработчик нажатия на открытие popup
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }
    // Функция обработчик нажатия на открытие popup
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }
    // Функция обработчик нажатия на открытие popup
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }
    // Функция закрытия всех popup'ов
    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setSelectedCard(null);
    }
    //Функция обновления стейт-переменной выбранной карточки
    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const handleUpdateUser = (newUserData) => {
        api.setUserInfo(newUserData)
        .then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((error) => {
            console.log(error);
        })
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
                    onCardDelete={handleCardDelete}
                />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

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

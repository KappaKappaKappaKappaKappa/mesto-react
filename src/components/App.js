import React, { useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // const [loggedIn, setLoggedIn] = useState();

  //Создание стейт-переменных открытия-закрытия popup'ов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopup, setIsConfirmDeletePopup] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(true);

  //Создание стейта текущего пользователя
  const [currentUser, setCurrentUser] = useState({
    name: "Загружаем...",
    about: "Загружаем...",
  });

  //Создание стейта карточек
  const [cards, setCards] = useState([]);

  //Создание стейта выбранной карточки
  const [selectedCard, setSelectedCard] = useState(null);

  //Создание стейта выбранной карточки для удаления
  const [cardToDelete, setCardToDelete] = useState(null);

  //Создание стейта индикатора загрузки данных
  const [isPreloading, setIsPreloading] = useState(false);

  //Получение данных текущего пользователя
  React.useEffect(() => {
    api
      .getInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Получение карточек
  React.useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Функция обновления стейт-переменной выбранной карточки
  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    //Проверка наличия лайка на карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //Запрос обновленных данных карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Функция обработчик нажатия на открытие popup
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  // Функция обработчик нажатия на открытие popup
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  // Функция обработчик нажатия на открытие popup
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  // Функция закрытия всех popup'ов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmDeletePopup(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  };
  //Функция отправки и обновления данных пользователя
  const handleUpdateUser = (newUserData) => {
    setIsPreloading(true);
    api
      .setUserInfo(newUserData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsPreloading(false);
      });
  };
  //Функция отправки и обновления аватара
  const handleUpdateAvatar = (newUserAvatar) => {
    setIsPreloading(true);
    api
      .setNewAvatar(newUserAvatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsPreloading(false);
      });
  };
  //Функция отправки и добавления новой карточки
  const handleAddPlaceSubmit = (newCard) => {
    setIsPreloading(true);
    api
      .addCard(newCard)
      .then((newCards) => {
        setCards([newCards, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsPreloading(false);
      });
  };

  //Функция показа PopupConfirm и установка карточки в стейт переменную
  const handleClickCardDeleteBtn = (card) => {
    setIsConfirmDeletePopup(true);
    setCardToDelete(card);
  };

  //Функция удаления карточки и обновления стейта
  const handleCardDelete = () => {
    setIsPreloading(true);
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        const updateCards = cards.filter((c) => c._id !== cardToDelete._id);
        setCards(updateCards);
        setIsConfirmDeletePopup(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSelectedCard(null);
        setIsPreloading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header />
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />

          <Route
            path="*"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onClickCardDeleteBtn={handleClickCardDeleteBtn}
              />
            }
          ></Route>
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isPreloading={isPreloading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isPreloading={isPreloading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isPreloading={isPreloading}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopup}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={selectedCard}
          isPreloading={isPreloading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

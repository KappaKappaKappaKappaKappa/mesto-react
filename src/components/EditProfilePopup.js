import { React, useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    //Подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    //Создаем стейт-переменные
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    //Эффект обновления стейт-переменных
    useEffect(() => {
        if (currentUser !== null) {
            setName(currentUser.name);
            setDescription(currentUser.about)
        }
    }, [currentUser])

    //Функция изменения стейт переменной на текущее значение input
    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    //Функция изменения стейт переменной на текущее значение input
    const handleChangeDescriprion = (e) => {
        setDescription(e.target.value);
    }
    //Функция получения значения input через рефы
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        })
    }

    return (
        <PopupWithForm title='Редактировать профиль' name='edit-profile' isOpen={isOpen} onClose={onClose} textBtnSave='Сохранить' onSubmit={handleSubmit}>
            <input className="pop-up__form-input pop-up__form-input_input_name" id='name-input' name="username"
                type="text" required minLength="2" maxLength="40" placeholder="Укажите имя" onChange={handleChangeName} />
            <span className="pop-up__form-input-error pop-up__form-name-input-error"></span>
            <input className="pop-up__form-input pop-up__form-input_input_profession" id='profession-input'
                name="profession" type="text" required minLength="2" maxLength="200"
                placeholder="Укажите чем вы занимаетесь" onChange={handleChangeDescriprion} />
            <span className="pop-up__form-input-error pop-up__form-profession-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
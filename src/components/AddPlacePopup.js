import PopupWithForm from "./PopupWithForm";
import { React, useRef } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    //Создание рефов для инпут полей
    const placeInputRef = useRef();
    const linkInputRef = useRef();

    //Функция получения значений inputs через рефы
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            title: placeInputRef.current.value,
            link: linkInputRef.current.value,
        })
    }

    return (
        <PopupWithForm title='Новое место' name='add-cards' isOpen={isOpen} onClose={onClose} textBtnSave='Создать' onSubmit={handleSubmit}>
            <input className="pop-up__form-input pop-up__form-input_input_place" id="place-input" name="title"
                type="text" placeholder="Название" required minLength="2" maxLength="30" ref={placeInputRef} />
            <span className="pop-up__form-input-error pop-up__form-place-input-error"></span>
            <input className="pop-up__form-input pop-up__form-input_input_link" id="link-input" name="link" type="url"
                placeholder="Ссылка на картинку" required ref={linkInputRef} />
            <span className="pop-up__form-input-error pop-up__form-link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
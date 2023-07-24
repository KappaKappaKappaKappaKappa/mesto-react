import { React, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPreloading }) {

    //Создания рефа инпут поля
    const avatarInputRef = useRef();

    //Функция получения значений inputs через рефы
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarInputRef.current.value
        })
    }

    return (
        <PopupWithForm title='Обновить аватар' name='new-avatar-form' isOpen={isOpen} onClose={onClose} textBtnSave={isPreloading ? 'Обновляем...' : 'Сохранить'} onSubmit={(handleSubmit)}>
            <input className="pop-up__form-input pop-up__form-input_input_avatar-url" id="avatar-url-input"
                name="avatar" type="url" placeholder="Ссылка на новый аватар" required ref={avatarInputRef} />
            <span className="pop-up__form-input-error pop-up__form-avatar-url-input-error"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;
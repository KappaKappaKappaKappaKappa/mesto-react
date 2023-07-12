function PopupWithForm({ title, name, children, isOpen, onClose, textBtnSave }) {
    return (
        <section className={`pop-up pop-up_show_${name} ${isOpen ? 'pop-up_opened' : ''}`}>
            <div className="pop-up__container">
                <form className="pop-up__form" name={name} noValidate>
                    <h2 className="pop-up__form-title">{title}</h2>
                    {children}
                    <button className="pop-up__form-button-save" type="submit" onClick={onClose}>{textBtnSave}</button>
                </form>
                <button className="pop-up__button-close" type="button" onClick={onClose}></button>
            </div>
        </section>
    )
}

export default PopupWithForm;
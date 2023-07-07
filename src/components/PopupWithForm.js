function PopupWithForm({ title, name, children, isOpen }) {
    return (
        <section className={`pop-up pop-up_show_${name} ${isOpen ? 'pop-up_opened' : ''}`}>
            <div className="pop-up__container">
                <form className="pop-up__form" name={name} novalidate>
                    <h2 className="pop-up__form-title">{title}</h2>
                    {children}
                    <button className="pop-up__form-button-save" type="submit">Сохранить</button>
                </form>
                <button className="pop-up__button-close" type="button"></button>
            </div>
        </section>
    )
}

export default PopupWithForm;
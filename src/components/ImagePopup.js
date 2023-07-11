function ImagePopup({ card, onClose }) {
    return (
        <section className={`pop-up pop-up_show_zoom-card ${card ? 'pop-up_opened' : ''}`}>
            {card && (
                <div className="pop-up__container pop-up__container_open_image">
                    <img className="pop-up__image" style={{ backgroundImage: `url(${card.link})` }} />
                    <h2 className="pop-up__card-name">{card.name}</h2>
                    <button className="pop-up__button-close" type="button" onClick={onClose}></button>
                </div>
            )}
        </section>
    )
}

export default ImagePopup;
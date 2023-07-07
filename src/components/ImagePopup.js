function ImagePopup() {
    return (
        <section className="pop-up pop-up_show_zoom-card">
            <div className="pop-up__container pop-up__container_open_image">
                <img src="#" alt="#" className="pop-up__image" />
                <h2 className="pop-up__card-name"></h2>
                <button className="pop-up__button-close" type="button"></button>
            </div>
        </section>
    )
}

export default ImagePopup;
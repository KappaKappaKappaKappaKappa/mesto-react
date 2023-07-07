function Main({ onEditProfile, onAddPlace, onEditAvatar }) {

    return (
        <main className="content">

            <section className="profile">
                <button className="profile__avatar-btn" onClick={onEditAvatar}>
                    <img className="profile__avatar" src="#" alt="Аватар" />
                </button>
                <div className="profile-info">
                    <div className="profile-info__container">
                        <h1 className="profile-info__name"></h1>
                        <button className="profile-info__edit-button" type="button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile-info__profession"></p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="cards">
                <ul className="cards__list">
                </ul>
            </section>
        </main>
    )
}

export default Main
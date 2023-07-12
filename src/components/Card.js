function Card({ card, onCardClick }) {

    const handleClick = () => {
        onCardClick(card);
    };

    return (
        <li className="cards__list-card" key={card._id}>
            <article className="card">
                <button className="card__trash" type="button"></button>
                <div className="card__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
                <div className="card__info">
                    <h2 className="card__place">{card.name}</h2>
                    <div className="card__like-container">
                        <button className="card__like" type="button"></button>
                        <span className="card__like-numbers">{card.likes.length}</span>
                    </div>
                </div>
            </article>
        </li>
    )
}

export default Card;
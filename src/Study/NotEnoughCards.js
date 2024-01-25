import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotEnoughCards = ({deck}) => {
    return (
        <div className="mb-1">
            <h4 className="mt-1">Not Enough Cards</h4>
            <p>You need at least 3 cards to study. There are {deck.cards.length} in this deck.</p>
            <Link to={`/decks/${deck.id}/cards/new`}>
                <button type="button" className="btn btn-primary">+ Add Cards</button>
            </Link>
        </div>
    )
}

export default NotEnoughCards;
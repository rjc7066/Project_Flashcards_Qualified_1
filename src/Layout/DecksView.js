import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteDeck } from "../utils/api";

const DeckView = ({deck}) => {
    const history = useHistory();

    const deleteBtnHandler = async () => {
        if (window.confirm("Delete this deck? Cannot be undone...")) {
            await deleteDeck(deck.id);
            history.push('/');
        }
    }
    return (
        <div className="container border mt-3">
            <div className="row justify-content-between">
                <h3 className="col-lg">{deck.name}</h3>
                <p className="col">{deck.cards.length} cards</p>
            </div>
            <p>{deck.description}</p>
            <div className="row justify-content-around my-1">
                <Link to={`/decks/${deck.id}`}>
                    <button className="btn btn-primary col-sm">View</button>
                </Link>
                <Link to={`decks/${deck.id}/study`}>
                    <button className="btn btn-secondary col-sm">Study</button>
                </Link>
                <button className="btn btn-danger" onClick={deleteBtnHandler}>Delete</button>
            </div>
        </div>
    )
}

export default DeckView;
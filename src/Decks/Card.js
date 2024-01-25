import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCard } from "../utils/api";

const Card = ({card, deckId}) => {
    const history = useHistory();

    const deleteBtnHandler = async () => {
        if (window.confirm("Delete this card?")) {
            await deleteCard(card.id);
            history.go(0)
        }
    }

    return (
        <div className="container border">
            <div className="row my-2 " >
                <p className="col-md-auto mx-2">{card.front}</p>
                <p>---</p>
                <p className="col-md-auto mx-2">{card.back}</p>
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                    <button type="button" className="btn btn-secondary mx-1 col-sm-auto">Edit</button>
                </Link>
                <button type="button" className="btn btn-danger btn-sm col-sm-auto" onClick={deleteBtnHandler}>Delete</button>
            </div>
        </div>
    )
}
export default Card;
import React, { useEffect, useState } from "react";
import { readDeck, readCard, updateCard, deleteCard } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "./CardForm";


const EditCard = () => {
    const {deckId, cardId} = useParams();

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const [newCardFront, setNewCardFront] = useState();
    const [newCardBack, setNewCardBack] = useState();

    const history = useHistory();

    useEffect(() => {
        async function loadDeck() {
          const response = await readDeck(deckId);
          const deckReturned = await response;
          setDeck(deckReturned);
        }
        loadDeck();
    }, [deckId]);

    useEffect(() => {
        async function loadCard() {
            const response = await readCard(cardId);
            const cardReturned = await response;
            setCard(cardReturned);
            setNewCardFront(cardReturned.front);
            setNewCardBack(cardReturned.back);
        }
        loadCard();

    }, [cardId]);

    const handleSubmit = async (front, back) => {
        await updateCard({id: cardId, front: front, back: back, deckId: deck.id});
        history.push(`/decks/${deckId}`);
    };

    const handleDelete = async () => {
        if (window.confirm("Delete this card?")) {
            await deleteCard(cardId);
        }
    }

    if (deck && card && newCardBack && newCardFront) {
        return (
            <div className="container border bg-light my-3 p-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
                    </ol>
                </nav>
                <CardForm submitHandler={handleSubmit} initialBack={newCardBack} initialFront={newCardFront} />
                <Link to="/">
                    <button type="button" className="btn btn-secondary" onClick={handleDelete}>Cancel</button>
                </Link>

            </div>
        )
    } else {
        return <p>Loading...</p>
    }

}

export default EditCard;
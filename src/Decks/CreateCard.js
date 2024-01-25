import React, { useEffect, useState } from "react";
import { readDeck, createCard } from "../utils/api";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "./CardForm";


const CreateCard = () => {
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();

    useEffect(() => {
        async function loadDeck() {
          const response = await readDeck(deckId);
          const deckReturned = await response;
          setDeck(deckReturned);
        }
        loadDeck();
    }, [deckId]);


    const handleSubmit = async (front, back) => {
        await createCard(deckId, {front, back});
    };

    if (deck) {
        return (
            <div className="container border bg-light my-3 p-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
                <h3>{deck.name}: Add Card</h3>

                <div className="container border bg-light my-3 p-3">
                    <CardForm submitHandler={handleSubmit} />
                    <Link to={`/decks/${deckId}`}>
                        <button type="button" className="btn btn-secondary">Done</button>
                    </Link>
                </div>
        </div>
    )} else {
        return <p>Loading...</p>
    }
}

export default CreateCard;
import React, { useEffect, useState } from "react";
import { deleteDeck, readDeck } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Card from "./Card";

const ViewDeck = () => {
    const { deckId } = useParams();
    const [deck, setDeck] = useState();

    const history = useHistory();

    useEffect(() => {
        async function loadDeck() {
          const response = await readDeck(deckId);
          const deckReturned = await response;
          setDeck(deckReturned);
        }
        loadDeck();
    }, [deckId]);

    const deleteBtnHandler = async () => {
        if (window.confirm("Delete this deck? Cannot be undone...")) {
            await deleteDeck(deck.id);
            history.push('/');
        }
    }

    if (deck) {
        return (
            <>
                <div className="container border bg-light my-3 p-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                        </ol>
                    </nav>
                    <h3>{deck.name}</h3>
                    <p>{deck.description}</p>
                    <div className="row justify-content-around">
                        <Link to={`/decks/${deck.id}/edit`}>
                            <button type="button" className="btn btn-secondary">Edit</button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button type="button" className="btn btn-primary">Study</button>
                        </Link>
                        <Link to={`/decks/${deck.id}/cards/new`}>
                            <button type="button" className="btn btn-primary">Add Cards</button>
                        </Link>
                        <div className="col-5" />
                        <button type="button" className="btn btn-danger" onClick={deleteBtnHandler}>Delete</button>
                    </div>
                    
                </div>
                <div className="container border bg-light my-3 p-3">
                    <h3>Cards</h3>
                    {deck.cards.map((card, index) => <Card key={index} card={card} deckId={deck.id}/>)}
                </div>
            </>
        )
    } else {
        return <p>Loading</p>;
    }

}

export default ViewDeck;
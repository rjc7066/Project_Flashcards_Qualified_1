import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";
import NotEnoughCards from "./NotEnoughCards";


const Study = () => {
    const [deck, setDeck] = useState({});
    const [currentCardId, setCurentCardId] = useState(0);
    const { deckId } = useParams();

    useEffect(() => {
      async function loadDeck() {
        const response = await readDeck(deckId);
        const deckReturned = await response;
        setDeck(deckReturned);
      }
      loadDeck();
    }, [deckId]);

    const history = useHistory();


    console.log(deckId);
    console.log(deck);

    const nextCardHandler = () => {
        if (currentCardId === deck.cards.length - 1) {
            if (window.confirm("Restart this deck of cards?")){
                setCurentCardId(0);
            } else {
                history.push('/');
            };
        } else {
            setCurentCardId(currentCardId + 1);
        };
    };

    if (deck.name) {
        return (
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/">{deck.name.split(' ')}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
                <h3>{deck.name}</h3>
                {deck.cards.length >= 3 
                    ? <StudyCard card={deck.cards[currentCardId]} nextCardHandler={nextCardHandler} deckSize={deck.cards.length - 1} index={currentCardId + 1}/>
                    : <NotEnoughCards deck={deck}/>
                }
                
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default Study;
import React, { useState } from "react";

const StudyCard = ({card, nextCardHandler, deckSize, index}) => {
    const [showBack, setShowBack] = useState(false);

    const flipHandler = () => {
        setShowBack(!showBack);
    }

    const nextHandler = () => {
        nextCardHandler();
        flipHandler();
    }

    return (
        <div className="container border rounded bg-light my-3 p-3">
            <p>Card {index} of {deckSize + 1}</p>
            {showBack ? <p className="mt-3">{card.back}</p> : <p className="mt-3">{card.front}</p>}
            <button type="button" className="btn btn-secondary m-1" onClick={flipHandler}>Flip</button>
            {showBack && <button type="button" className="btn btn-primary m-1" onClick={nextHandler}>Next</button>}
        </div>
    )
}

export default StudyCard;
import React, {useState, useEffect} from "react";
import { readDeck, updateDeck } from "../utils/api";
import { useHistory, useParams, Link} from "react-router-dom/cjs/react-router-dom.min";

const EditDeck = () => {
    const { deckId } = useParams();
    const [deck, setDeck] = useState();
    const [newDeckName, setNewDeckName] = useState('');
    const [newDeckDescription, setNewDeckDescription] = useState('');

    const history = useHistory();

    useEffect(() => {
        async function loadDeck() {
          const response = await readDeck(deckId);
          const deckReturned = await response;
          setDeck(deckReturned);
          setNewDeckDescription(deckReturned.description);
          setNewDeckName(deckReturned.name);
        }
        loadDeck();
    }, [deckId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await updateDeck({id: deck.id, name: newDeckName, description: newDeckDescription});
        const editedDeck = await response;
        history.push(`/decks/${editedDeck.id}`);
    };

    if (deck) {
        return (
            <div className="container border rounded bg-light my-3 p-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h3>Edit Deck</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="name">Enter Deck Name:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={(e) => setNewDeckName(e.target.value)}
                    value={newDeckName}
                />
                </div>

                <div className="form-group">
                    <label htmlFor="name"> Enter Description: </label>
                    <textarea
                        id="description"
                        type="text"
                        name="description"
                        className="form-control"
                        onChange={(e) => setNewDeckDescription(e.target.value)}
                        value={newDeckDescription}
                    />
                </div>
                <button type="submit" className="btn btn-primary mr-1">Submit</button>
                <Link to="/">
                    <button type="button" className="btn btn-secondary">Cancel</button>
                </Link>
            </form>
        </div>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default EditDeck;
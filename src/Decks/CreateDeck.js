import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createDeck } from "../utils/api";

const CreateDeck = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createDeck({name, description});
        const createdDeck = await response;
        history.push(`/decks/${createdDeck.id}`);
    };

    return (
        <div className="container border rounded bg-light my-3 p-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h3>Create Deck</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="name">Enter Deck Name:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                </div>

                <div className="form-group">
                    <label htmlFor="name"> Enter Description: </label>
                    <textarea
                        id="description"
                        type="text"
                        name="description"
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <button type="submit" className="btn btn-primary mr-1">Submit</button>
                <Link to="/">
                    <button type="button" className="btn btn-secondary">Cancel</button>
                </Link>
            </form>
        </div>
    )
}

export default CreateDeck;
import { useState } from "react";

const CardForm = ({submitHandler, initialFront, initialBack}) => {
    const [front, setFront] = useState(initialFront);
    const [back, setBack] = useState(initialBack);

    const handleSubmit = (event) => {
        event.preventDefault();
        submitHandler(front, back);
        setFront('');
        setBack('');
    }

    return (
        <div className="container border bg-light my-3 p-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="name">Front:</label>
                <textarea
                    id="front"
                    type="text"
                    name="front"
                    className="form-control"
                    onChange={(e) => setFront(e.target.value)}
                    value={front}
                />
                </div>

                <div className="form-group">
                    <label htmlFor="back"> Back: </label>
                    <textarea
                        id="back"
                        type="text"
                        name="back"
                        className="form-control"
                        onChange={(e) => setBack(e.target.value)}
                        value={back}
                    />
                </div>
                <button type="submit" className="btn btn-primary mr-1">Submit</button>
            </form>
        </div>
    )
}

export default CardForm;
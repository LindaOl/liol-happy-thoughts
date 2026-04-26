import { useState } from "react";

export const Submit = ({ onAddMessage }) => {
    /*input state*/
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", newMessage);

        if (!newMessage.trim()) return;

        if (newMessage.trim().length < 5 || newMessage.length > 140) {
            setError("Message must be between 5 and 140 characters");
            setTimeout(() => setError(""), 3000);

            return;
        }

        /*calling for the prop returns newMessage state, which is the content of the textArea*/
        onAddMessage(newMessage);
        /*then, empty textarea*/
        setNewMessage("");
    };


    return (
        <section className="submit-card-container">
            <h3>What's making you happy right now?</h3>
            <form onSubmit={handleSubmit}>

                <textarea
                    className="add-message-input"
                    placeholder="Write your happy thought here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>

                {/*if wrong character amount is submitted, show this*/}
                {error && (
                    <div className="error-msg">
                        <p>{error}</p>
                    </div>
                )}

                <button className="submit-button" type="submit">
                    <img src="./images/red-heart.png" alt="red-heart" />
                    Send Happy Thought
                    <img src="./images/red-heart.png" alt="red-heart" />
                </button>

            </form>
        </section>
    );
};
import { useState } from "react";

export const Submit = ({ onAddMessage }) => {
    /*input state*/
    const [newMessage, setNewMessage] = useState("");

    const handleSubmit = () => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        /*calling for the prop returns newMessage state, which is the content of the textArea*/
        onAddMessage(newMessage);
        /*then, empty textarea*/
        setNewMessage("");
    }

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

                <button className="submit-button" type="submit">
                    <img src="./images/red-heart.png" alt="red-heart" />
                    Send Happy Thought
                    <img src="./images/red-heart.png" alt="red-heart" />
                </button>
            </form>
        </section>
    );
};
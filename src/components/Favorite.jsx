import { useState } from "react";

export const Favorite = ({ hearts, onLike }) => {
    const [isLiking, setIsLiking] = useState(false);

    const handleClick = async () => {
        if (isLiking) return;

        setIsLiking(true);

        try {
            await onLike();
        } finally {
            setIsLiking(false);
        }
    };

    const count = hearts;

    return (
        <article className="favorite-container">

            <button
                className="favorite-button-wrapper"
                onClick={handleClick}
                disabled={isLiking}
            >
                <img src="./images/red-heart.png" alt="red-heart" />
            </button>
            <span>x {count}</span>

        </article>

    );
};
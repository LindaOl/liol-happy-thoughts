
export const Favorite = ({ hearts, onLike }) => {
    const count = hearts;

    return (
        <article className="favorite-container">
            <button className="favorite-button-wrapper" onClick={onLike}>
                <img src="./images/red-heart.png" alt="red-heart" />
            </button>
            <span>x {count}</span>
        </article>

    );
};
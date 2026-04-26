
export const Favorite = ({ hearts }) => {
    const count = hearts;

    return (
        <article className="favorite-container">
            <div className="favorite-button-wrapper">
                <img src="./images/red-heart.png" alt="red-heart" />
            </div>
            <span>x {count}</span>
        </article>

    );
};
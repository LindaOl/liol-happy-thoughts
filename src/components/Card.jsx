import { Time } from "./Time";
import { Favorite } from "./Favorite";

export const Card = ({ message, onLike }) => {
    return (
        <div className="card-container">
            <p>{message.message}</p>

            <div className="favorite-and-time-wrapper">
                <Favorite
                    hearts={message.hearts}
                    onLike={() => onLike(message._id)}
                />
                <Time createdAt={message.createdAt} />
            </div>
        </div>
    );
};
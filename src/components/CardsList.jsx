import { Card } from "./Card";

export const CardsList = ({ thoughts, onLike, loading }) => {

    if (loading && thoughts.length === 0) {
        return (
            <div className="loading-container">
                <div className="loader-wrapper">
                    <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <h1 className="loading">Loading in progress...</h1>
            </div>
        )
    };


    return (
        <section className="card-list-container">

            {[...thoughts]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((message) => (
                    <Card
                        key={message._id}
                        message={message}
                        onLike={onLike}
                    />
                ))}

        </section>
    );
};


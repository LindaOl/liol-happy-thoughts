import { Card } from "./Card";

export const CardsList = ({ thoughts }) => {
    return (
        <section className="card-list-container">
            {[...thoughts]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((message) => (
                    <Card key={message._id} message={message} />
                ))}
        </section>
    );
};
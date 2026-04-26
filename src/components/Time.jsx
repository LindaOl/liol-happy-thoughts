export const Time = ({ createdAt }) => {

    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    /*convert to seconds*/
    const diffSeconds = Math.floor(diffMs / 1000);

    /*create time label*/
    const seconds = diffSeconds;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeAgo = "";

    if (seconds < 60) {
        timeAgo = `${seconds} seconds ago`;
    } else if (minutes < 60) {
        timeAgo = `${minutes} minutes ago`;
    } else if (hours < 24) {
        timeAgo = `${hours} hours ago`;
    } else {
        timeAgo = `${days} days ago`;
    }

    return (
        <article>

            <p>{timeAgo}</p>

        </article>
    );
};
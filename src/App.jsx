import "./App.css";
import "./loading.css";
import { useState, useEffect } from "react";

import { Submit } from "./components/Submit";
import { CardsList } from "./components/CardsList";

export const App = () => {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Fetch messages when component mounts */
  useEffect(() => {
    fetchMessages();
  }, []);

  /* Fetch all thoughts from API */
  const fetchMessages = () => {
    setLoading(true);

    fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")
      .then((response) => response.json())
      .then((messages) => {
        setMessageList(messages);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /* Add a new message via API and prepend it to the list */
  const handleAddMessage = async (message) => {
    const response = await fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error("Error:", errorData);
      } catch {
        console.error("Failed to add message");
      }
      return;
    }

    const data = await response.json();

    /* Add the new message at the top of the list */
    setMessageList((prev) => [data, ...prev]);
  };


  /* Send like request and update message in state */
  const handleLike = async (id) => {
    const response = await fetch(
      `https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      try {
        const errorData = await response.json();
        console.error("Error:", errorData);
      } catch {
        console.error("Failed to like message");
      }
      return;
    }

    const updatedMessage = await response.json();

    /* Replace the liked message with updated version */
    setMessageList((prev) =>
      prev.map((msg) =>
        msg._id === id ? updatedMessage : msg
      )
    );
  };

  return (
    <div className="app-container">

      <Submit onAddMessage={handleAddMessage} />
      <CardsList thoughts={messageList} onLike={handleLike} loading={loading} />

    </div>
  )
}

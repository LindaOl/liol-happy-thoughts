import "./App.css";
import { useState, useEffect } from "react";

import { Submit } from "./components/Submit";
import { CardsList } from "./components/CardsList";

export const App = () => {
  const [messageList, setMessageList] = useState([]);

  /* Fetch messages when component mounts */
  useEffect(() => {
    fetchMessages();
  }, []);

  /* Fetch all thoughts from API */
  const fetchMessages = () => {
    fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")
      .then((response) => response.json())
      .then((messages) => {
        setMessageList(messages);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
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
      <CardsList thoughts={messageList} onLike={handleLike} />

    </div>
  )
}

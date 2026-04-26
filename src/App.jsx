import "./App.css";
import { useState, useEffect } from "react";

import { Submit } from "./components/Submit";
import { CardsList } from "./components/CardsList";


export const App = () => {
  const [messageList, setMessageList] = useState([]);


  /*DISPLAY MESSAGES LOGIC*/
  /*Render fetchMessage on loading the page, empty [] makes it ONLY on page load*/
  useEffect(() => {
    fetchMessages();
  }, []);

  /*Render when messaList updates */
  useEffect(() => {
    console.log("messageList updated:", messageList);
  }, [messageList]);


  /*First i fetch the API and get the json*/
  const fetchMessages = () => {
    fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")
      .then((respons) => respons.json())
      .then((messages) => {
        console.log("Fetched messages:", messages);
        setMessageList(messages);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
      })
  }


  /*SUBMIT FORM LOGIC*/
  const handleAddMessage = async (message) => {
    console.log("Received in App:", message);
    const response = await fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    /* Add the new message at the top of the object, data is added, and then all the older posts follow*/
    setMessageList((prev) => [data, ...prev]);
    console.log(data);
  };


  /*handle adding a like*/
  const handleLike = async (id) => {
    const response = await fetch(
      `https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`,
      {
        method: "POST",
      }
    );

    /*when run, get the updated message*/
    const updatedMessage = await response.json();

    /*update the state, go through previous list, replace only the one that matches the id of the one clicked */
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

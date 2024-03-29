import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import "./App.css";

const socket = io.connect("http://localhost:8000");
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName }); // Corrected typo here
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });

    return () => {
      socket.off("chat"); // Clean up the event listener
    };
  }, [chat]);

  return (
    <>
      <h1>Chatty App</h1>

      {chat.map((payload, index) => {
        return (
          <p key={index}>
            {payload.message} : <span>id: {payload.userName}</span>
          </p>
        );
      })}

      <form onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="send text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;

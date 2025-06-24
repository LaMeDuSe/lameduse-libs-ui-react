import React from "react";
import Historique from "./Historique";
import { MessageProps } from "./Message";
import { useState } from "react";
import "./Chat.css";

interface ChatProps {
  messages: MessageProps[];
  script?: boolean;
}

const Chat: React.FC<ChatProps>=({messages=[], script=false})=>{
  const [localMessages, setLocalMessages] = useState<MessageProps[]>(messages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const newMsg: MessageProps = {
      id: localMessages.length + 1,
      author: "Moi",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setLocalMessages([...localMessages, newMsg]);
    setNewMessage("");

  };

  return(
    <div className="chat">
      <Historique messages={localMessages}/>

      {script && (
        <div className="chat-script">
          <input
          type="text"
          placeholder="Entrer un message..."
          value={newMessage}
          onChange={(e)=> setNewMessage(e.target.value)}
          onKeyDown={(e)=> e.key === "Enter" && handleSend()}/>
          <button onClick={handleSend}>Envoyer</button>
          </div>
      )}
    </div>
  );
};

export default Chat;



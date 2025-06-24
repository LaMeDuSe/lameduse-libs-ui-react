import React from "react";
import "./Message.css"


export interface MessageProps {
  id: number;
  author: string;
  content: string;
  timestamp?: string | null;
}

const Message: React.FC<MessageProps>=({content, author ,timestamp})=>{
  const isMe=author.toLowerCase() === "moi";
  return(
    <div className={`message ${isMe ? "message-mine" : "message-other"}`}>
      <div className="message-header">
        <div className={`author ${isMe ? "author-mine" : "author-other"}`}>
          <strong>{author}:</strong>
        </div>
        <span className="timestamp">
          {timestamp ?? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="message-content">
        {content}
      </div>
    </div>

  );
};

export default Message;
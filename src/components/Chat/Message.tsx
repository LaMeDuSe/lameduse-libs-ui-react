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
    <div className={`message ${isMe ? "component_Chat_message_mine" : "component_Chat_message_other"}`}>
      <div className="component_Chat_message_header">
        <div className={`component_Chat_message_author ${isMe ? "component_Chat_component_Chat_message_author_mine" : "component_Chat_author_other"}`}>
          <strong>{author}:</strong>
        </div>
        <span className="component_Chat_timestamp">
          {timestamp ?? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="component_Chat_message_content">
        {content}
      </div>
    </div>

  );
};

export default Message;
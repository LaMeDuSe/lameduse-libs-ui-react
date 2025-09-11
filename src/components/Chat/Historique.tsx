import React from "react";
import Message from "./Message";
import { MessageProps } from "./Message";
import "./Historique.css"
import { useEffect } from "react";
import { useRef } from "react";


interface HistoriqueProps {
  messages: MessageProps[];
}

const Historique: React.FC<HistoriqueProps>=({messages})=>{
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (typeof bottomRef.current?.scrollIntoView === "function") {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);
    return (
        <div className="component_Chat_historique">
        {[...messages]
        .sort((a, b) => a.id - b.id)
        .map((msg) => (
          <Message key={msg.id} {...msg} />
        ))}
        <div ref={bottomRef} />
        </div>
    );
};

export default Historique;
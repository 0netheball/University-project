import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';



function useAutoScroll(dependencies: object) {
  const chatMessagesRef = useRef<HTMLDivElement>(null); // built-in type

  useEffect(() => {
    const containerElement = chatMessagesRef.current;
    if (containerElement) {
      containerElement.scrollTop = containerElement.scrollHeight;
    }
  }, [dependencies]);

  return chatMessagesRef;
}

type ChatMessagesProps = {
  chatMessages: {
    id: string;
    message: string;
    sender: string;
    time: number
  }[];
}

export function ChatMessages({chatMessages}: ChatMessagesProps) {
  const chatMessagesRef = useAutoScroll(chatMessages);
  
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((message) => {
        return (
          <ChatMessage 
            key={message.id}
            message={message.message}
            sender={message.sender}
            time={message.time}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;
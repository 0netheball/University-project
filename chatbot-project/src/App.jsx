import { useState } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css';

export default function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'id1',
      message: 'hello chatbot',
      sender: 'user'
    }, 
    {
      id: 'id2',
      message: 'Hello! How can I help you?', 
      sender: 'robot'
    }, 
    {
      id: 'id3', 
      message: 'can you get me todays date?', 
      sender: 'user'
    }, 
    {
      id: 'id4', 
      message: 'Today is September 27',
      sender: 'robot'
    }
  ]);
  return (
    <div className="app-container">
      
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}


